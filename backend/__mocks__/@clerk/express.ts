// Manual Jest mock for @clerk/express: auth middleware become pass-throughs and
// getAuth returns a fixed test user, so route logic can be tested without Clerk.
import type { NextFunction, Request, Response } from 'express'

export const clerkMiddleware = () => (_req: Request, _res: Response, next: NextFunction) => next()

export const requireAuth = () => (_req: Request, _res: Response, next: NextFunction) => next()

export const getAuth = (_req: Request) => ({ userId: 'user_test' })
