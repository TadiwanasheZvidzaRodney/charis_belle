'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { sendSMS } from '@/lib/twilio'

export type SendCampaignState = {
  error?: string
  success?: string
  emailsSent?: number
  emailsFailed?: number
  smsSent?: number
  smsFailed?: number
} | null

/**
 * Send a campaign to selected users (email and/or SMS based on campaign channel).
 */
export async function sendCampaignAction(
  _prev: SendCampaignState,
  formData: FormData
): Promise<SendCampaignState> {
  const campaignId = String(formData.get('campaignId') ?? '')
  const userIds = formData.getAll('userIds') as string[]

  if (!campaignId) {
    return { error: 'Please select a campaign.' }
  }

  if (!userIds.length) {
    return { error: 'Please select at least one user.' }
  }

  const supabase = createAdminClient()

  // Fetch the campaign
  const { data: campaign, error: campError } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', campaignId)
    .single()

  if (campError || !campaign) {
    return { error: 'Campaign not found.' }
  }

  // Fetch selected users (include phone)
  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone')
    .in('id', userIds)

  if (usersError || !users?.length) {
    return { error: 'Failed to fetch users.' }
  }

  const channel = campaign.channel || 'email'
  const results = { emailsSent: 0, emailsFailed: 0, smsSent: 0, smsFailed: 0 }

  for (const user of users) {
    // ----- SEND EMAIL -----
    if ((channel === 'email' || channel === 'both') && user.email && campaign.body_html) {
      const personalizedHtml = campaign.body_html
        .replaceAll('{{full_name}}', user.full_name || 'Valued Customer')
        .replaceAll('{{email}}', user.email)

      try {
        const { error: emailError } = await resend.emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: campaign.subject || 'Message from Charis Belle',
          html: personalizedHtml,
        })

        if (emailError) throw emailError

        await supabase.from('message_logs').insert({
          user_id: user.id,
          campaign_id: campaign.id,
          channel: 'email',
          status: 'sent',
        })

        results.emailsSent++
      } catch (err) {
        console.error(`Email failed for ${user.email}:`, err)

        await supabase.from('message_logs').insert({
          user_id: user.id,
          campaign_id: campaign.id,
          channel: 'email',
          status: 'failed',
        })

        results.emailsFailed++
      }
    }

    // ----- SEND SMS -----
    if ((channel === 'sms' || channel === 'both') && user.phone && campaign.sms_body) {
      const personalizedSMS = campaign.sms_body
        .replaceAll('{{full_name}}', user.full_name || 'Valued Customer')

      try {
        const smsResult = await sendSMS({ to: user.phone, message: personalizedSMS })

        if (!smsResult.success) throw new Error(smsResult.error)

        await supabase.from('message_logs').insert({
          user_id: user.id,
          campaign_id: campaign.id,
          channel: 'sms',
          status: 'sent',
          message_id: smsResult.messageId,
        })

        results.smsSent++
      } catch (err) {
        console.error(`SMS failed for ${user.phone}:`, err)

        await supabase.from('message_logs').insert({
          user_id: user.id,
          campaign_id: campaign.id,
          channel: 'sms',
          status: 'failed',
        })

        results.smsFailed++
      }
    }
  }

  revalidatePath('/admin/dashboard')

  const totalSent = results.emailsSent + results.smsSent
  const totalFailed = results.emailsFailed + results.smsFailed

  if (totalFailed > 0 && totalSent === 0) {
    return { error: `All messages failed to send.`, ...results }
  }

  const parts: string[] = []
  if (results.emailsSent > 0) parts.push(`${results.emailsSent} email${results.emailsSent !== 1 ? 's' : ''}`)
  if (results.smsSent > 0) parts.push(`${results.smsSent} SMS`)
  
  let message = `Sent ${parts.join(' and ')}`
  if (totalFailed > 0) message += ` (${totalFailed} failed)`

  return { success: message, ...results }
}
