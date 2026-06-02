// Manual Jest mock for @clerk/express: auth middleware become pass-throughs and
// getAuth returns a fixed test user, so route logic can be tested without Clerk.
import type { NextFunction, Request, Response } from 'express'

export const clerkMiddleware = () => (_req: Request, _res: Response, next: NextFunction) => next()

// jest.fn so tests can simulate an unauthenticated request with
// getAuth.mockReturnValueOnce({ userId: null }). Defaults to a signed-in user.
export const getAuth = jest.fn((_req: Request) => ({ userId: 'user_test' as string | null }))
