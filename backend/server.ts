import cors from "cors" // Add this line
import express, { Express } from "express"
const app: Express = express()
const port = 3001

app.use(cors()) // Enable CORS

app.get("/", (req: any, res: any) => {
  return res.json({ message: "Welcome to MTG Finder's backend!" })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
