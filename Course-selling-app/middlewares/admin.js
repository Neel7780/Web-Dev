const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

function adminMiddleware(req, res, next){
    const token = req.headers.token
    try{
        const response = jwt.verify(token, JWT_SECRET)
        if(response){
            req.email = response.email
            next();
        } else{
            res.status(403).json({
                message : "Invalid Credentials"
            })
        }
    } catch(e){
        res.status(403).json({
            message : "invalid token"
        })
    }
}

module.exports = adminMiddleware