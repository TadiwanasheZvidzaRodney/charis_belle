import { NextResponse, type NextRequest } from 'next/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

/**
 * Email confirmation callback for Supabase Auth.
 *
 * Supabase sends users a link like:
 *   https://yourapp.com/auth/confirm?token_hash=...&type=signup&next=/profile
 *
 * We verify the OTP, which sets the auth cookies, then redirect to `next`.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/profile'

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Something went wrong — send them to login with a hint.
  return NextResponse.redirect(`${origin}/login?error=confirmation_failed`)
}
