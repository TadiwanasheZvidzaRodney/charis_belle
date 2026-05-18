import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from './types'

/**
 * Routes that DO NOT require authentication.
 * Everything else is protected.
 */
const PUBLIC_PATHS = ['/', '/login', '/signup', '/auth']

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
}

/**
 * Called from the root `middleware.ts` on every matching request.
 *
 * 1. Refresh the Supabase auth cookies (critical — without this, Server
 *    Components see a stale/expired session).
 * 2. If the user is NOT signed in and the route is protected, redirect to /login.
 * 3. If the user IS signed in and visits /login or /signup, send them to /profile.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: don't run code between createServerClient and getUser().
  // getUser() revalidates the token and triggers cookie refresh via setAll above.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Not signed in + protected route → /login
  if (!user && !isPublicPath(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // Signed in + visiting an auth page → /profile
  if (user && (pathname === '/login' || pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/profile'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
