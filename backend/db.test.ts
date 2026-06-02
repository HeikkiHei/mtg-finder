import { connectToDatabase } from './db'

describe('connectToDatabase', () => {
  it('throws when DB_CONN_STRING is not set', async () => {
    const previous = process.env.DB_CONN_STRING
    delete process.env.DB_CONN_STRING
    try {
      await expect(connectToDatabase()).rejects.toThrow(/DB_CONN_STRING/)
    } finally {
      if (previous !== undefined) process.env.DB_CONN_STRING = previous
    }
  })
})
