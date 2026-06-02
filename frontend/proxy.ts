import { clerkMiddleware } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

// Clerk wraps the request (so auth() / useAuth() work), then next-intl handles
// locale routing. API routes are excluded below — they're proxied to the
// backend, which verifies the Clerk token itself via @clerk/express.
export default clerkMiddleware((_auth, request) => handleI18nRouting(request))

export const config = {
  // Everything except API routes, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
