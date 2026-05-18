'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export type AuthState = {
  error?: string
  message?: string
} | null

/**
 * Log a user in with email + password.
 * On success → redirect to /profile.
 * On failure → returns { error } so the form can show it.
 */
export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

/**
 * Sign a new user up with email + password.
 * Supabase will send a confirmation email (if email confirmations are enabled
 * in your Supabase project Auth settings). The `emailRedirectTo` points back
 * at our `/auth/confirm` route handler which exchanges the code for a session.
 */
export async function signupAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }
  if (password !== confirm) {
    return { error: 'Passwords do not match.' }
  }

  const supabase = await createClient()
  const origin = (await headers()).get('origin') ?? ''

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=/profile`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  // If the project requires email confirmation, `session` will be null.
  if (!data.session) {
    return {
      message:
        'Almost there! Check your inbox to confirm your email, then log in.',
    }
  }

  // Otherwise we're already signed in.
  revalidatePath('/', 'layout')
  redirect('/profile')
}

/**
 * Sign the current user out (used by the navbar / logout button).
 */
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
