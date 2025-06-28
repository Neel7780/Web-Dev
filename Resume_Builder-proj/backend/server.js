import express from "express"
import cors from "cors"
import "dotenv/config"

const app = express()
const PORT = 3000

app.use(cors())

//connect DB

//Middleware
app.use(express.json())

//routes
app.get("/", (req,res)=>{
    res.send('API working')
})

app.listen(PORT, ()=>{
    console.log(`Server working on http://localhost:${PORT}`)
})