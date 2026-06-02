import { messages } from '@/i18n/messages'
import { useAuth } from '@clerk/nextjs'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import type { ReactElement } from 'react'
import AuthControls from './AuthControls'

const mockUseAuth = useAuth as unknown as jest.Mock

function renderWithIntl(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages.en}>
      {ui}
    </NextIntlClientProvider>
  )
}

describe('AuthControls', () => {
  it('shows the sign-in button when signed out', () => {
    mockUseAuth.mockReturnValue({ isLoaded: true, isSignedIn: false })
    renderWithIntl(<AuthControls />)

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.queryByTestId('clerk-user-button')).not.toBeInTheDocument()
  })

  it('shows the user button when signed in', () => {
    mockUseAuth.mockReturnValue({ isLoaded: true, isSignedIn: true })
    renderWithIntl(<AuthControls />)

    expect(screen.getByTestId('clerk-user-button')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument()
  })
})
