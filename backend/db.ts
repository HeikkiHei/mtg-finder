import * as mongoDB from 'mongodb'

/**
 * MongoDB connection and collection handles. Kept separate from the Express app
 * so the app (and its routes) can be imported in tests without opening a
 * database connection.
 */
export const collections: { cards?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  const DB_CONN_STRING = process.env.DB_CONN_STRING

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    DB_CONN_STRING ||
      (() => {
        throw new Error('Environment variable DB_CONN_STRING is not defined')
      })()
  )

  await client.connect()

  const db: mongoDB.Db = client.db(process.env.DB_NAME)

  const cardCollection: mongoDB.Collection = db.collection(
    process.env.COLLECTION_NAME ||
      (() => {
        throw new Error('Environment variable COLLECTION_NAME is not defined')
      })()
  )

  collections.cards = cardCollection

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${cardCollection.collectionName}`
  )
}
