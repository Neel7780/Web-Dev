const express = require("express")
const app = express()
const jwt = require("jsonwebtoken") 
const JWT_SECRET = "neel212006"
app.use(express.json())

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})

const users = []

app.post("/signup", (req,res)=> {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username : username,
        password : password
    })

    res.json({
        message: "Signed up!"
    })
})

app.post("/signin", (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    let founduser = null
    for(let i=0; i<users.length; i++){
        if(users[i].username === username && users[i].password === password){
            founduser = users[i]
        }
    }
    if(!founduser){
        res.sendStatus(403).json({
            message:"Invalid Credentials!"
        })
    } else {
        const token = jwt.sign({
            username : founduser.username
        }, JWT_SECRET)
        res.json({
            message: "signed in successfully!",
            token: token
        })
    }
})

function auth_mid(req,res,next){
    const token = req.headers.token
    const decodeduser = jwt.verify(token, JWT_SECRET)
    const username = decodeduser.username
    req.username = username
    next()
}

app.get("/me", auth_mid, (req,res)=>{
    const currentusername = req.username
    let founduser = null
    for(let i=0; i<users.length; i++){
        if(users[i].username === currentusername){
            founduser = users[i]
        }
    }
    res.json({
        username : founduser.username,
        password : founduser.password
    })
})

app.listen(3000)