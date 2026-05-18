import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

/**
 * Server-side Supabase client (Server Components, Server Actions, Route Handlers).
 *
 * Reads the user's session from Next.js cookies and refreshes tokens when needed.
 * Always respects Row Level Security — it acts as the *logged-in user*, never
 * as an admin. For admin-only operations, use `createAdminClient` from
 * `./admin.ts` instead.
 *
 * @example
 *   import { createClient } from '@/lib/supabase/server'
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be safely ignored if you have middleware refreshing
            // user sessions (see `middleware.ts` in task 1.3).
          }
        },
      },
    }
  )
}
