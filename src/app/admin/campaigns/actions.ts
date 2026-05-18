'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'

export type CampaignState = {
  error?: string
  success?: string
} | null

/**
 * Create a new campaign.
 */
export async function createCampaignAction(
  _prev: CampaignState,
  formData: FormData
): Promise<CampaignState> {
  const name = String(formData.get('name') ?? '').trim()
  const type = String(formData.get('type') ?? '') as 'birthday' | 'reminder'
  const subject = String(formData.get('subject') ?? '').trim()
  const body_html = String(formData.get('body_html') ?? '').trim()

  if (!name || !type || !subject || !body_html) {
    return { error: 'All fields are required.' }
  }

  if (!['birthday', 'reminder'].includes(type)) {
    return { error: 'Invalid campaign type.' }
  }

  const supabase = createAdminClient()

  const { error } = await supabase.from('campaigns').insert({
    name,
    type,
    subject,
    body_html,
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
