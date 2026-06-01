"use client"

import { useEffect, useState } from "react"
import BinderUpload from "./BinderUpload"

interface Card {
  id: number
  name: string
  type: string
  rarity: string
}

export default function Home() {
  const [cards, setCards] = useState<Card[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/cards") // Use full backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setCards(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>MTG Finder</h1>
      <BinderUpload />
      <h2>Saved cards</h2>
      {cards ? (
        <ul>
          {cards.map((card) => (
            <li key={card.id?.toString()}>
              {card.name} - {card.type} ({card.rarity})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
