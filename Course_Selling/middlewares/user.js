const jwt = require("jsonwebtoken")
const JWT_USER_PASSWORD = require("../config").JWT_USER_PASSWORD

async function userMiddleware(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD)
        req.user = decoded
        next()
    } catch (error) {
        console.error("JWT verification failed:", error)
        return res.status(403).json({ message: "Forbidden" })
    }
}
module.exports = {
    userMiddleware
}