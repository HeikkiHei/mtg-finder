import * as dotenv from "dotenv"
import { app } from "./app"
import { connectToDatabase } from "./db"

dotenv.config() // Load environment variables at the top

const PORT = Number(process.env.PORT) || 3001

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
