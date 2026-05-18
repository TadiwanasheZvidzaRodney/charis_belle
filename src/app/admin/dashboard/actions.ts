'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { resend, FROM_EMAIL } from '@/lib/resend'

export type SendCampaignState = {
  error?: string
  success?: string
  sent?: number
  failed?: number
} | null

/**
 * Send a campaign to selected users.
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

  // Fetch selected users
  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .in('id', userIds)

  if (usersError || !users?.length) {
    return { error: 'Failed to fetch users.' }
  }

  const results = { sent: 0, failed: 0 }

  for (const user of users) {
    if (!user.email) {
      console.log(`Skipping user ${user.id}: no email`)
      continue
    }

    // Replace placeholders
    const personalizedHtml = campaign.body_html
      .replaceAll('{{full_name}}', user.full_name || 'Valued Customer')
      .replaceAll('{{email}}', user.email)

    try {
      const { error: emailError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: user.email,
        subject: campaign.subject,
        html: personalizedHtml,
      })

      if (emailError) {
        throw emailError
      }

      // Log successful send
      await supabase.from('message_logs').insert({
        user_id: user.id,
        campaign_id: campaign.id,
        status: 'sent',
      })

      results.sent++
    } catch (err) {
      console.error(`Failed to send to ${user.email}:`, err)

      // Log failed send
      await supabase.from('message_logs').insert({
        user_id: user.id,
        campaign_id: campaign.id,
        status: 'failed',
      })

      results.failed++
    }
  }

  revalidatePath('/admin/dashboard')

  if (results.failed > 0 && results.sent === 0) {
    return { error: `All ${results.failed} emails failed to send.` }
  }

  return {
    success: `Sent ${results.sent} email${results.sent !== 1 ? 's' : ''}${
      results.failed > 0 ? `, ${results.failed} failed` : ''
    }.`,
    sent: results.sent,
    failed: results.failed,
  }
}
