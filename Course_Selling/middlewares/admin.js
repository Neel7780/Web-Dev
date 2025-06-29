const jwt = require("jsonwebtoken")
const JWT_ADMIN_PASSWORD = require("../config").JWT_ADMIN_PASSWORD

async function adminMiddleware(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD)
        req.admin = decoded
        next()
    } catch (error) {
        console.error("JWT verification failed:", error)
        return res.status(403).json({ message: "Forbidden" })
    }
}
module.exports = {
    adminMiddleware
}