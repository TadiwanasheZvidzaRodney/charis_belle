import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

/**
 * Run on every route EXCEPT:
 *  - Next.js internals (_next/static, _next/image)
 *  - favicon, robots, sitemap, etc.
 *  - Static image files (matched by extension)
 *
 * Keeping this matcher tight is important so cookie refresh runs on real
 * page navigations but NOT on every static asset request.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
