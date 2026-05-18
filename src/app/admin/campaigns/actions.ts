'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'

export type CampaignState = {
  error?: string
  success?: string
} | null

/**
 * Create a new campaign (email, SMS, or both).
 */
export async function createCampaignAction(
  _prev: CampaignState,
  formData: FormData
): Promise<CampaignState> {
  const name = String(formData.get('name') ?? '').trim()
  const type = String(formData.get('type') ?? '') as 'birthday' | 'reminder'
  const channel = String(formData.get('channel') ?? 'email') as 'email' | 'sms' | 'both'
  const subject = String(formData.get('subject') ?? '').trim()
  const body_html = String(formData.get('body_html') ?? '').trim()
  const sms_body = String(formData.get('sms_body') ?? '').trim()

  if (!name || !type || !channel) {
    return { error: 'Name, type, and channel are required.' }
  }

  if (!['birthday', 'reminder'].includes(type)) {
    return { error: 'Invalid campaign type.' }
  }

  if (!['email', 'sms', 'both'].includes(channel)) {
    return { error: 'Invalid channel.' }
  }

  // Validate email fields if email channel
  if ((channel === 'email' || channel === 'both') && (!subject || !body_html)) {
    return { error: 'Email subject and body are required for email campaigns.' }
  }

  // Validate SMS fields if SMS channel
  if ((channel === 'sms' || channel === 'both') && !sms_body) {
    return { error: 'SMS body is required for SMS campaigns.' }
  }

  const supabase = createAdminClient()

  const { error } = await supabase.from('campaigns').insert({
    name,
    type,
    channel,
    subject: subject || null,
    body_html: body_html || null,
    sms_body: sms_body || null,
    is_active: true,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/campaigns')
  redirect('/admin/campaigns')
}

/**
 * Toggle a campaign's active status.
 */
export async function toggleCampaignAction(
  campaignId: string,
  currentStatus: boolean
) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('campaigns')
    .update({ is_active: !currentStatus })
    .eq('id', campaignId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/campaigns')
}

/**
 * Delete a campaign.
 */
export async function deleteCampaignAction(campaignId: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', campaignId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/campaigns')
}
