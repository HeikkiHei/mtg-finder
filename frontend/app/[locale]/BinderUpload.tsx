'use client'

import { useAuth } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import { useState, type ChangeEvent } from 'react'

interface CardMatch {
  scryfallId: string
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

interface BinderGrid {
  rows: number
  cols: number
}

// Every rows×cols layout from a single card up to a 4×4 page (16 slots — a
// 15-card booster pack laid out with one slot empty still fits).
const AXES = [1, 2, 3, 4]
const LAYOUT_OPTIONS = AXES.flatMap(rows => AXES.map(cols => ({ rows, cols })))
// The standard nine-pocket binder page, used as the default.
const DEFAULT_LAYOUT = '3x3'

export default function BinderUpload() {
  const t = useTranslations('scan')
  const { isSignedIn, getToken } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [layout, setLayout] = useState(DEFAULT_LAYOUT)
  const [cards, setCards] = useState<CardCrop[] | null>(null)
  const [grid, setGrid] = useState<BinderGrid | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState<Record<number, boolean>>({})

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null
    setFile(selected)
    setCards(null)
    setGrid(null)
    setError(null)
    setSaved({})
    // Release the previous object URL before replacing it so repeated picks
    // don't leak blobs.
    setPreview(previous => {
      if (previous) URL.revokeObjectURL(previous)
      return selected ? URL.createObjectURL(selected) : null
    })
  }

  const saveCard = async (card: CardCrop) => {
    if (!card.match) return
    try {
      const token = await getToken()
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          scryfallId: card.match.scryfallId,
          name: card.match.name,
          set: card.match.set,
          eur: card.prices?.eur ?? null
        })
      })
      if (response.ok) {
        setSaved(current => ({ ...current, [card.index]: true }))
      }
    } catch (err) {
      console.error('Failed to save card:', err)
    }
  }

  const handleProcess = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setCards(null)
    setGrid(null)
    setSaved({})

    try {
      const formData = new FormData()
      formData.append('image', file)
      const [rows, cols] = layout.split('x')
      formData.append('rows', rows)
      formData.append('cols', cols)

      const token = await getToken()
      const response = await fetch('/api/scan/process', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const data = await response.json()
      setCards(data.cards)
      setGrid(data.grid ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image')
    } finally {
      setLoading(false)
    }
  }

  // Only positively identified cards count; backs and anything we can't match
  // are shown separately and excluded from the total.
  const recognized =
    cards?.filter((card): card is CardCrop & { match: CardMatch } => card.match !== null) ?? []
  const unrecognized = cards?.filter(card => card.match === null) ?? []

  return (
    <section
      aria-labelledby="scan-heading"
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <h2 id="scan-heading" className="text-xl font-semibold">
        {t('heading')}
      </h2>
      <p id="scan-help" className="mt-1 text-sm text-gray-600">
        {t('help')}
      </p>

      {/* Screen-reader status updates (errors use role=alert below). */}
      <p role="status" aria-live="polite" className="sr-only">
        {loading
          ? t('statusProcessing')
          : cards
            ? t('statusDetected', { count: recognized.length })
            : ''}
      </p>

      <div className="mt-4">
        <label htmlFor="binder-file" className="block text-sm font-medium text-gray-900">
          {t('fileLabel')}
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

      <div className="mt-4">
        <label htmlFor="binder-layout" className="block text-sm font-medium text-gray-900">
          {t('gridLabel')}
        </label>
        <select
          id="binder-layout"
          value={layout}
          onChange={event => setLayout(event.target.value)}
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
        >
          {LAYOUT_OPTIONS.map(({ rows, cols }) => (
            <option key={`${rows}x${cols}`} value={`${rows}x${cols}`}>
              {rows}×{cols}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleProcess}
        disabled={!file || loading}
        aria-busy={loading}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 px-5 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 sm:w-auto"
      >
        {loading ? t('processing') : t('process')}
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
          <figcaption className="text-sm font-medium text-gray-700">{t('original')}</figcaption>
          <img
            src={preview}
            alt={t('fileLabel')}
            className="mt-2 w-full max-w-sm rounded-lg border border-gray-200"
          />
        </figure>
      )}

      {cards && (
        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold">
              {t('detected', { count: recognized.length })}
            </h3>
            {grid && (
              <span className="text-sm text-gray-500">
                {t('gridUsed', { rows: grid.rows, cols: grid.cols })}
              </span>
            )}
          </div>
          {recognized.length > 0 && (
            <ul role="list" className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {recognized.map(card => (
                <li
                  key={card.index}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <img
                    src={card.image}
                    alt={t('altScanned', { name: card.match.name })}
                    className="aspect-63/88 w-full bg-gray-100 object-contain"
                  />
                  <div className="space-y-0.5 p-2 text-center">
                    <p
                      className="truncate text-xs font-medium"
                      title={`${card.match.name} (${card.match.set.toUpperCase()})`}
                    >
                      {`${card.match.name} (${card.match.set.toUpperCase()})`}
                    </p>
                    {card.prices?.eur != null && (
                      <p className="text-xs text-gray-600">€{card.prices.eur.toFixed(2)}</p>
                    )}
                    {isSignedIn && (
                      <button
                        type="button"
                        onClick={() => saveCard(card)}
                        disabled={saved[card.index]}
                        className="mt-1 w-full rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-200 disabled:text-gray-500"
                      >
                        {saved[card.index] ? t('saved') : t('save')}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {unrecognized.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700">
                {t('unidentified', { count: unrecognized.length })}
              </h4>
              <ul role="list" className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {unrecognized.map(card => (
                  <li
                    key={card.index}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white opacity-80"
                  >
                    <img
                      src={card.image}
                      alt={t('altUnrecognized', { index: card.index + 1 })}
                      className="aspect-63/88 w-full bg-gray-100 object-contain"
                    />
                    <p className="p-2 text-center text-xs text-gray-500">{t('unrecognized')}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
