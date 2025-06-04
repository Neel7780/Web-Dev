const mongoose = require("mongoose")
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const {z} = require("zod") 

const {UserModel, TodoModel} = require("./db")

const {auth, JWT_SECRET} = require("./auth")

app.use(express.json())

app.post("/signup", async (req,res)=>{
    //input validation using zod
    const requireBody = z.object({
        email : z.string().min(3).max(100).email(),
        password : z.string(). min(3).max(100),
        name : z.string().min(3).max(100)
    })
    
    //  Parse the request body using the requireBody.safeParse() method to validate the data format
    const parseDatawithSuccess = requireBody.safeParse(req.body)

    // if format is incorrect
    if(!parseDatawithSuccess.success){
        return res.status(401).json({
            message: "Invalid data format",
            error: parseDatawithSuccess.error
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedpassword = await bcrypt.hash(password, 5)

    try {
        await UserModel.create({
            email: email,
            password: hashedpassword,
            name: name
        }) 
    } catch(e){
        return res.json({
            message: "User already exists"
        })
    }

    res.json({
        message: "You are signed up!"
    })
})

app.post("/signin", async (req,res)=>{
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email: email
    })

    if(!user){
        return res.sendStatus(401).json({
            message: "invalid credentials"
        })
    }

    const passwordMatch = bcrypt.compare(password, user.password)

    if(passwordMatch){
        const token = jwt.sign({
            id : user._id.toString()
        }, JWT_SECRET)
        res.json({
            message : "You are signed in!"
        }) 
    } else{
        res.status(403).json({
            message: "invalid credentials"
        })
    }
})

app.post("/todo", auth, async (req,res)=>{
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    })

    res.json({
        message: "Todo created"
    })
})

app.get("/todos", auth, async (req,res)=>{
    const userId = req.userId
    const todos = await TodoModel.find({
        userId
    })
    res.json({
        todos
    })
})

app.listen(3000)