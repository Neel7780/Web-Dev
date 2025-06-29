require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const { MONGO_URL } = require("./config")
const app = express()
const {adminRouter} = require("./routes/admin")
const {userRouter} = require("./routes/user")
//const {courseRouter} = require("./routes/course")

const PORT = process.env.PORT

app.use(express.json())

app.use("/user", userRouter)
app.use("/admin", adminRouter)

async function main(){
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Connected to db")
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    } catch(e){
        console.error("Failed to connect to the database", e);
    }
}

main().catch(err => console.error("Error in main function:", err));