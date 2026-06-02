// Manual Jest mock for @clerk/nextjs. useAuth is a jest.fn (default: a loaded,
// signed-in user) so tests can override the auth state; Show derives its
// branch from useAuth, mirroring the real component.
import type { ReactNode } from 'react'

export const useAuth = jest.fn(() => ({
  isLoaded: true,
  isSignedIn: true,
  userId: 'user_test',
  getToken: async () => 'test-token'
}))

export const ClerkProvider = ({ children }: { children: ReactNode }) => <>{children}</>

export const SignInButton = ({ children }: { children?: ReactNode }) => <>{children}</>

export const UserButton = () => <div data-testid="clerk-user-button" />

export function Show({
  when,
  children
}: {
  when: 'signed-in' | 'signed-out'
  children: ReactNode
}) {
  const { isSignedIn } = useAuth()
  if (when === 'signed-in') return isSignedIn ? <>{children}</> : null
  if (when === 'signed-out') return isSignedIn ? null : <>{children}</>
  return <>{children}</>
}
