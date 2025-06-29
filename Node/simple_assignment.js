const express = require("express");

const app = express();

app.get("/sum/:a/:b", function(req, res) {  // dynamic routing
    const a = parseInt(req.params.a)
    const b = parseInt(req.params.a)
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