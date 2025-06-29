import express from "express"
const app = express()

import { router } from "./routes/v1"

const PORT = 3000

app.use(express.json())

app.use("/api/v1", router)

app.listen(PORT,() => {
    console.log(`Server running on ${PORT}`)
})