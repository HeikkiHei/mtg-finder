import React, { useEffect, useState } from "react"

const App: React.FC = () => {
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setData(data.message)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>MTG Finder</h1>
      <p>{data ? data : "Loading..."}</p>
    </div>
  )
}

export default App
