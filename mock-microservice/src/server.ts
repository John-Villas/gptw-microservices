import "reflect-metadata"
import "dotenv/config"
import express from "express"
import { routes } from "./routes"

const port = process.env.SERVER_PORT || 3003
const app = express()

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`listenning at port ${port}`)
})
