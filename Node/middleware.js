const express = require("express");
const app = express();

let counter=0

function tot_req_counts_middleware(req,res,next){
    counter=counter+1
    next();
}

app.get("/admin", (req,res) => {
    res.send({
        "total_req_Counters" : counter
    })
})

//middleware
app.use(tot_req_counts_middleware)

app.get("/sum/:a/:b", function(req, res) {  // dynamic routing
    const a = parseInt(req.params.a)
    const b = parseInt(req.params.b)
    const sum = a+b
    res.send(sum)
});

app.get("/multiply", function(req, res) {
    const a = req.query.a
    const b = req.query.b
    res.send(a*b)
});

app.get("/divide", function(req, res) {
    const a = req.query.a
    const b = req.query.b
    res.send(a/b)
});

app.get("/subtract", function(req, res) {
    const a = req.query.a
    const b = req.query.b
    res.send(a-b)
});

app.listen(3000);