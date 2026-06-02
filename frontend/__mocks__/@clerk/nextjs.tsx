// Manual Jest mock for @clerk/nextjs: a passthrough provider and a fixed
// signed-in user, so component tests run without a real Clerk session.
import type { ReactNode } from 'react'

export const useAuth = () => ({
  isLoaded: true,
  isSignedIn: true,
  userId: 'user_test',
  getToken: async () => 'test-token'
})

export const ClerkProvider = ({ children }: { children: ReactNode }) => <>{children}</>

export const SignInButton = ({ children }: { children?: ReactNode }) => <>{children}</>

export const UserButton = () => null
