import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/**
 * Admin (service-role) Supabase client.
 *
 * ⚠️  SERVER-ONLY. Never import this from a Client Component.
 *     The service role key bypasses Row Level Security and must never
 *     be exposed to the browser.
 *
 * Use this for admin tasks like:
 *   - Listing all profiles in the admin dashboard
 *   - Sending campaigns / writing to `message_logs`
 *   - Anything that needs to bypass RLS
 *
 * @example
 *   // Inside a Server Component / Server Action / Route Handler:
 *   import { createAdminClient } from '@/lib/supabase/admin'
 *   const supabase = createAdminClient()
 *   const { data } = await supabase.from('profiles').select('*')
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase admin env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    )
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
