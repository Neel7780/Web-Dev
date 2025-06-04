// express - we can create HTTP servers using express, basically exposing our code/logic to whole world

const express = require('express')
const app = express()
const port = 3000  //now i can run this on http://localhost:3000 either on postman or on browser! 

// app.get('/', (req, res) => {  // req is required action whereas res is resolve
//   res.send('Hello World!')  
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

function calculate_factorial(n){
    if(n==0 || n==1){
        return 1
    }
    else return n*calculate_factorial(n-1)
}

app.get('/', (req, res) => {
    const n = req.query.n // takes input from link http://localhost:3000?n=30 (n=30 is input parameter)
    const ans = calculate_factorial(n)
    res.send(ans.toString())
})

app.listen(port)