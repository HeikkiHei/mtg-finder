import { messages } from '@/i18n/messages'
import { useAuth } from '@clerk/nextjs'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import type { ReactElement } from 'react'
import Home from './page'

const fetchMock = jest.fn()
const mockUseAuth = useAuth as unknown as jest.Mock
const signedIn = {
  isLoaded: true,
  isSignedIn: true,
  userId: 'user_test',
  getToken: async () => 'test-token'
}

function renderWithIntl(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages.en}>
      {ui}
    </NextIntlClientProvider>
  )
}

beforeEach(() => {
  ;(globalThis as { fetch: unknown }).fetch = fetchMock
  fetchMock.mockReset()
  mockUseAuth.mockReturnValue(signedIn) // reset to signed-in before each test
})

describe('Home', () => {
  it('renders the title and the binder upload section', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => [] })
    renderWithIntl(<Home />)

    expect(await screen.findByRole('heading', { name: 'MTG Finder', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /scan a binder page/i })).toBeInTheDocument()
  })

  it('renders the signed-in user’s saved cards (with the auth token)', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [{ _id: '1', name: 'Sol Ring', set: 'cmr', eur: 1.5 }]
    })
    renderWithIntl(<Home />)

    expect(await screen.findByText('Sol Ring (CMR)')).toBeInTheDocument()
    expect(screen.getByText('€1.50')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith('/api/cards', {
      headers: { Authorization: 'Bearer test-token' }
    })
  })

  it('shows an error message when the cards request fails', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    fetchMock.mockResolvedValue({ ok: false, status: 500 })
    renderWithIntl(<Home />)

    expect(await screen.findByRole('alert')).toHaveTextContent(/couldn.t load saved cards/i)
    errorSpy.mockRestore()
  })

  it('shows a loading placeholder (not the sign-in prompt) while Clerk initialises', () => {
    mockUseAuth.mockReturnValue({ isLoaded: false, isSignedIn: false, getToken: async () => null })
    renderWithIntl(<Home />)

    expect(screen.queryByText(/sign in to see your collection/i)).not.toBeInTheDocument()
    expect(screen.getByText(/loading…/i)).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('prompts to sign in once loaded but signed out', async () => {
    mockUseAuth.mockReturnValue({ isLoaded: true, isSignedIn: false, getToken: async () => null })
    renderWithIntl(<Home />)

    expect(await screen.findByText(/sign in to see your collection/i)).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
