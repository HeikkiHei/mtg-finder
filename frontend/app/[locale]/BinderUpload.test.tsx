import { messages } from '@/i18n/messages'
import { useAuth } from '@clerk/nextjs'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import type { ReactElement } from 'react'
import BinderUpload from './BinderUpload'

const fetchMock = jest.fn()
const mockUseAuth = useAuth as unknown as jest.Mock
const signedIn = {
  isLoaded: true,
  isSignedIn: true,
  userId: 'user_test',
  getToken: async () => 'test-token'
}

const recognizedScan = {
  ok: true,
  json: async () => ({
    cards: [
      {
        index: 0,
        row: 0,
        col: 0,
        width: 1,
        height: 1,
        image: 'data:image/png;base64,AAA',
        match: {
          scryfallId: 'sf1',
          name: 'Sol Ring',
          set: 'cmr',
          collectorNumber: '1',
          distance: 0
        },
        prices: { eur: 1.5, eurFoil: null }
      }
    ]
  })
}

function renderWithIntl(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages.en}>
      {ui}
    </NextIntlClientProvider>
  )
}

function fileInput(container: HTMLElement) {
  return container.querySelector('input[type="file"]') as HTMLInputElement
}

const pngFile = () => new File(['x'], 'binder.png', { type: 'image/png' })

beforeEach(() => {
  ;(globalThis as { fetch: unknown }).fetch = fetchMock
  fetchMock.mockReset()
  mockUseAuth.mockReturnValue(signedIn) // reset to signed-in before each test
  // jsdom doesn't implement object URLs, which handleSelect uses for the preview.
  ;(globalThis.URL as { createObjectURL: unknown }).createObjectURL = jest.fn(() => 'blob:preview')
})

describe('BinderUpload', () => {
  it('renders the upload UI with Process disabled until a file is chosen', () => {
    renderWithIntl(<BinderUpload />)
    expect(screen.getByRole('heading', { name: /scan a binder page/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /process/i })).toBeDisabled()
  })

  it('shows a preview and enables Process after selecting a file', async () => {
    const user = userEvent.setup()
    const { container } = renderWithIntl(<BinderUpload />)

    await user.upload(fileInput(container), new File(['x'], 'binder.png', { type: 'image/png' }))

    expect(screen.getByRole('button', { name: /process/i })).toBeEnabled()
    expect(screen.getByAltText(/binder photo/i)).toBeInTheDocument()
  })

  it('uploads the image and renders the detected card crops', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        cards: [
          {
            index: 0,
            row: 0,
            col: 0,
            width: 1,
            height: 1,
            image: 'data:image/png;base64,AAA',
            match: {
              scryfallId: 'sf1',
              name: 'Sol Ring',
              set: 'cmr',
              collectorNumber: '472',
              distance: 2
            },
            prices: { eur: 1.5, eurFoil: 6.25 }
          },
          {
            index: 1,
            row: 0,
            col: 1,
            width: 1,
            height: 1,
            image: 'data:image/png;base64,BBB',
            match: null,
            prices: null
          }
        ]
      })
    })
    const user = userEvent.setup()
    const { container } = renderWithIntl(<BinderUpload />)

    await user.upload(fileInput(container), new File(['x'], 'binder.png', { type: 'image/png' }))
    await user.click(screen.getByRole('button', { name: /process/i }))

    expect(await screen.findByText(/detected cards \(2\)/i)).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
    expect(screen.getByText('Sol Ring (CMR)')).toBeInTheDocument()
    expect(screen.getByText('€1.50')).toBeInTheDocument()
    expect(screen.getByText('Unrecognized')).toBeInTheDocument()
    // Signed in (Clerk mocked), so recognized cards offer a Save action.
    expect(screen.getByRole('button', { name: /^save$/i })).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/scan/process',
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('shows the server error message when processing fails', async () => {
    fetchMock.mockResolvedValue({ ok: false, text: async () => 'image too large' })
    const user = userEvent.setup()
    const { container } = renderWithIntl(<BinderUpload />)

    await user.upload(fileInput(container), new File(['x'], 'binder.png', { type: 'image/png' }))
    await user.click(screen.getByRole('button', { name: /process/i }))

    expect(await screen.findByText('image too large')).toBeInTheDocument()
  })

  it('saves a recognized card via POST /api/cards when Save is clicked', async () => {
    fetchMock
      .mockResolvedValueOnce(recognizedScan) // the scan
      .mockResolvedValueOnce({ ok: true, json: async () => ({ _id: 'x' }) }) // the save
    const user = userEvent.setup()
    const { container } = renderWithIntl(<BinderUpload />)

    await user.upload(fileInput(container), pngFile())
    await user.click(screen.getByRole('button', { name: /process/i }))
    await user.click(await screen.findByRole('button', { name: /^save$/i }))

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/cards',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ Authorization: 'Bearer test-token' })
        })
      )
    )
    const postCall = fetchMock.mock.calls.find(
      ([url, opts]) => url === '/api/cards' && opts?.method === 'POST'
    )
    expect(JSON.parse(postCall![1].body)).toMatchObject({
      scryfallId: 'sf1',
      name: 'Sol Ring',
      set: 'cmr',
      eur: 1.5
    })
    // The button reflects the saved state.
    expect(await screen.findByRole('button', { name: /^saved$/i })).toBeInTheDocument()
  })

  it('does not offer a Save action when signed out', async () => {
    mockUseAuth.mockReturnValue({ isLoaded: true, isSignedIn: false, getToken: async () => null })
    fetchMock.mockResolvedValue(recognizedScan)
    const user = userEvent.setup()
    const { container } = renderWithIntl(<BinderUpload />)

    await user.upload(fileInput(container), pngFile())
    await user.click(screen.getByRole('button', { name: /process/i }))

    expect(await screen.findByText('Sol Ring (CMR)')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^save$/i })).not.toBeInTheDocument()
  })
})
