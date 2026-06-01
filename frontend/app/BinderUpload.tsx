'use client'

import { useState, type ChangeEvent } from 'react'

const API_BASE = 'http://localhost:3001'

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

      const response = await fetch(`${API_BASE}/api/scan/process`, {
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
    <section>
      <h2>Scan a binder page</h2>
      <p>Upload a photo of a 9-card binder page to split it into cards.</p>

      <input type="file" accept="image/*" onChange={handleSelect} />
      <button onClick={handleProcess} disabled={!file || loading}>
        {loading ? 'Processing…' : 'Process'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {preview && !cards && (
        <div>
          <h3>Original</h3>
          <img src={preview} alt="Uploaded binder page" style={{ maxWidth: 400 }} />
        </div>
      )}

      {cards && (
        <div>
          <h3>Detected cards ({cards.length})</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              maxWidth: 400
            }}
          >
            {cards.map(card => (
              <figure key={card.index} style={{ margin: 0 }}>
                <img
                  src={card.image}
                  alt={`Card ${card.index + 1}`}
                  style={{ width: '100%', border: '1px solid #ccc' }}
                />
                <figcaption style={{ fontSize: 12, textAlign: 'center' }}>
                  {card.match
                    ? `${card.match.name} (${card.match.set.toUpperCase()})`
                    : 'Unrecognized'}
                  {card.prices?.eur != null && <div>€{card.prices.eur.toFixed(2)}</div>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
