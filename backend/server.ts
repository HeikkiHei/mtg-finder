import cors from "cors"
import express, { Request, Response } from "express"
import * as mongoDB from "mongodb"
import * as dotenv from "dotenv"
import Card from "./cards/card"

dotenv.config() // Load environment variables at the top

const PORT = 3001
const app = express()
const DB_CONN_STRING = process.env.DB_CONN_STRING
export const collections: { cards?: mongoDB.Collection } = {}
export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    DB_CONN_STRING ||
      (() => {
        throw new Error("Environment variable DB_CONN_STRING is not defined")
      })(),
  )

  await client.connect()

  const db: mongoDB.Db = client.db(process.env.DB_NAME)

  const cardCollection: mongoDB.Collection = db.collection(
    process.env.COLLECTION_NAME ||
      (() => {
        throw new Error("Environment variable COLLECTION_NAME is not defined")
      })(),
  )

  collections.cards = cardCollection

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${cardCollection.collectionName}`,
  )
}

app.use(cors()) // Enable CORS

app.get("/api/cards", async (_req: Request, res: Response) => {
  try {
    const cards = (await collections.cards!.find({}).toArray()) as Card[]

    res.status(200).send(cards) // Send the cards as JSON
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send("An unknown error occurred")
    }
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  connectToDatabase()
    .then(() => {
      console.log("Connected to database")
    })
    .catch((err) => {
      console.error("Failed to connect to database", err)
    })
})
