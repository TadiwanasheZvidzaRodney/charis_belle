import { createClient } from '@/lib/supabase/server'

/**
 * Returns the current user's profile (including role) if signed in.
 * Returns null if not signed in or profile doesn't exist.
 *
 * Uses the cookie-based server client — safe for Server Components.
 */
export async function getCurrentUserProfile() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .eq('id', user.id)
    .maybeSingle()

  return profile
}

/**
 * Shorthand: returns true if the current user is an admin.
 */
export async function isCurrentUserAdmin() {
  const profile = await getCurrentUserProfile()
  return profile?.role === 'admin'
}
