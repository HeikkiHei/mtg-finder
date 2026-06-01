'use client'

import { useState, type ChangeEvent } from 'react'

interface CardMatch {
  name: string
  set: string
  collectorNumber: string
  distance: number
}

interface CardPrices {
  eur: number | null
  eurFoil: number | null
}

interface CardCrop {
  index: number
  row: number
  col: number
  width: number
  height: number
  image: string
  match: CardMatch | null
  prices: CardPrices | null
}

export default function BinderUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [cards, setCards] = useState<CardCrop[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null
    setFile(selected)
    setCards(null)
    setError(null)
    setPreview(selected ? URL.createObjectURL(selected) : null)
  }

  const handleProcess = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setCards(null)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/scan/process', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const data = await response.json()
      setCards(data.cards)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      aria-labelledby="scan-heading"
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <h2 id="scan-heading" className="text-xl font-semibold">
        Scan a binder page
      </h2>
      <p id="scan-help" className="mt-1 text-sm text-gray-600">
        Upload a photo of a 9-card binder page to split it into cards.
      </p>

      {/* Screen-reader status updates (errors use role=alert below). */}
      <p role="status" aria-live="polite" className="sr-only">
        {loading ? 'Processing image…' : cards ? `Detected ${cards.length} cards.` : ''}
      </p>

      <div className="mt-4">
        <label htmlFor="binder-file" className="block text-sm font-medium text-gray-900">
          Binder photo
        </label>
        <input
          id="binder-file"
          type="file"
          accept="image/*"
          onChange={handleSelect}
          aria-describedby="scan-help"
          className="mt-2 block w-full cursor-pointer rounded-md border border-gray-300 text-sm text-gray-700 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        />
      </div>

      <button
        type="button"
        onClick={handleProcess}
        disabled={!file || loading}
        aria-busy={loading}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 px-5 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 sm:w-auto"
      >
        {loading ? 'Processing…' : 'Process'}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      {preview && !cards && (
        <figure className="mt-6">
          <figcaption className="text-sm font-medium text-gray-700">Original</figcaption>
          <img
            src={preview}
            alt="Uploaded binder page"
            className="mt-2 w-full max-w-sm rounded-lg border border-gray-200"
          />
        </figure>
      )}

      {cards && (
        <div className="mt-6">
          <h3 className="text-base font-semibold">Detected cards ({cards.length})</h3>
          <ul role="list" className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cards.map(card => (
              <li
                key={card.index}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <img
                  src={card.image}
                  alt={
                    card.match
                      ? `Scanned card: ${card.match.name}`
                      : `Unrecognized card ${card.index + 1}`
                  }
                  className="aspect-63/88 w-full bg-gray-100 object-contain"
                />
                <div className="space-y-0.5 p-2 text-center">
                  <p
                    className="truncate text-xs font-medium"
                    title={
                      card.match
                        ? `${card.match.name} (${card.match.set.toUpperCase()})`
                        : 'Unrecognized'
                    }
                  >
                    {card.match
                      ? `${card.match.name} (${card.match.set.toUpperCase()})`
                      : 'Unrecognized'}
                  </p>
                  {card.prices?.eur != null && (
                    <p className="text-xs text-gray-600">€{card.prices.eur.toFixed(2)}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
