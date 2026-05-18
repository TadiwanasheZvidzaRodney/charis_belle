import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

// Support both new publishable key and classic anon key
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Browser (client-component) Supabase client.
 *
 * Use this inside React Client Components (files with "use client").
 * It automatically reads and writes the auth session from browser cookies
 * (via @supabase/ssr) so sessions stay in sync with the server.
 *
 * @example
 *   'use client'
 *   import { createClient } from '@/lib/supabase/client'
 *   const supabase = createClient()
 *   const { data } = await supabase.auth.getUser()
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    SUPABASE_KEY
  )
}
