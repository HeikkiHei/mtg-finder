import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BinderUpload from './BinderUpload'

const fetchMock = jest.fn()

function fileInput(container: HTMLElement) {
  return container.querySelector('input[type="file"]') as HTMLInputElement
}

beforeEach(() => {
  ;(globalThis as { fetch: unknown }).fetch = fetchMock
  fetchMock.mockReset()
  // jsdom doesn't implement object URLs, which handleSelect uses for the preview.
  ;(globalThis.URL as { createObjectURL: unknown }).createObjectURL = jest.fn(() => 'blob:preview')
})

describe('BinderUpload', () => {
  it('renders the upload UI with Process disabled until a file is chosen', () => {
    render(<BinderUpload />)
    expect(screen.getByRole('heading', { name: /scan a binder page/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /process/i })).toBeDisabled()
  })

  it('shows a preview and enables Process after selecting a file', async () => {
    const user = userEvent.setup()
    const { container } = render(<BinderUpload />)

    await user.upload(fileInput(container), new File(['x'], 'binder.png', { type: 'image/png' }))

    expect(screen.getByRole('button', { name: /process/i })).toBeEnabled()
    expect(screen.getByAltText(/uploaded binder page/i)).toBeInTheDocument()
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
            match: { name: 'Sol Ring', set: 'cmr', collectorNumber: '472', distance: 2 },
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
    const { container } = render(<BinderUpload />)

    await user.upload(fileInput(container), new File(['x'], 'binder.png', { type: 'image/png' }))
    await user.click(screen.getByRole('button', { name: /process/i }))

    expect(await screen.findByText(/detected cards \(2\)/i)).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
    expect(screen.getByText('Sol Ring (CMR)')).toBeInTheDocument()
    expect(screen.getByText('€1.50')).toBeInTheDocument()
    expect(screen.getByText('Unrecognized')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/scan/process',
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('shows the server error message when processing fails', async () => {
    fetchMock.mockResolvedValue({ ok: false, text: async () => 'image too large' })
    const user = userEvent.setup()
    const { container } = render(<BinderUpload />)

    await user.upload(fileInput(container), new File(['x'], 'binder.png', { type: 'image/png' }))
    await user.click(screen.getByRole('button', { name: /process/i }))

    expect(await screen.findByText('image too large')).toBeInTheDocument()
  })
})
