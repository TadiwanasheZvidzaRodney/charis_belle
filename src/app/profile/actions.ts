'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type ProfileState = {
  error?: string
  success?: string
} | null

/**
 * Upsert the signed-in user's profile row.
 *
 * Uses the cookie-aware server client, so RLS applies — the user can only
 * write their own row (the "Users insert/update own profile" policies).
 *
 * The DB trigger `on_auth_user_created` already inserts a stub row at signup,
 * so this is effectively an UPDATE. We use `upsert` defensively in case the
 * row is missing for any reason.
 */
export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You are not signed in.' }
  }

  const full_name = String(formData.get('full_name') ?? '').trim() || null
  const birth_date = String(formData.get('birth_date') ?? '').trim() || null
  const phone = String(formData.get('phone') ?? '').trim() || null
  const channel = String(formData.get('channel') ?? 'email')
  const marketing_opt_in = formData.get('marketing_opt_in') === 'on'

  // Light validation
  if (full_name && full_name.length > 120) {
    return { error: 'Full name is too long (max 120 characters).' }
  }
  if (birth_date && !/^\d{4}-\d{2}-\d{2}$/.test(birth_date)) {
    return { error: 'Birth date must be a valid date.' }
  }

  const { error } = await supabase.from('profiles').upsert(
    {
      id: user.id,
      email: user.email ?? null,
      full_name,
      birth_date,
      phone,
      preferences: { channel, marketing_opt_in },
    },
    { onConflict: 'id' }
  )

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/profile')
  return { success: 'Profile saved.' }
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
