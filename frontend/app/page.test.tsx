import { render, screen } from '@testing-library/react'
import Home from './page'

const fetchMock = jest.fn()

beforeEach(() => {
  ;(globalThis as { fetch: unknown }).fetch = fetchMock
  fetchMock.mockReset()
})

describe('Home', () => {
  it('renders the title and the binder upload section', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => [] })
    render(<Home />)

    expect(await screen.findByRole('heading', { name: 'MTG Finder', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /scan a binder page/i })).toBeInTheDocument()
  })

  it('renders saved cards returned by the API', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: 'Sol Ring', type: 'Artifact', rarity: 'uncommon' }]
    })
    render(<Home />)

    expect(await screen.findByText(/Sol Ring - Artifact \(uncommon\)/)).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/api/cards')
  })

  it('keeps showing Loading when the cards request fails', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    fetchMock.mockResolvedValue({ ok: false, status: 500 })
    render(<Home />)

    expect(await screen.findByText(/loading/i)).toBeInTheDocument()
    errorSpy.mockRestore()
  })
})
