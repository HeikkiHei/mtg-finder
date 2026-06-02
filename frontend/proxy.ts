import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

// Only the sign-in / sign-up pages are reachable while signed out (with or
// without a locale prefix). Everything else requires an account.
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/:locale/sign-in(.*)',
  '/:locale/sign-up(.*)'
])

// Force login: protect every non-public route (auth.protect() redirects
// signed-out users to the sign-in page), then run next-intl locale routing.
// API routes are excluded by the matcher — the backend verifies tokens itself.
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
  return handleI18nRouting(request)
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
