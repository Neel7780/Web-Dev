import { NextFunction } from "express"
import jwt from "jsonwebtoken"
const JWT_PASSWORD = "neel2222"

export async function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"]
    try {
        const decoded = jwt.verify(token as string, JWT_PASSWORD)
        req.username = decoded
        next()
    } catch (error) {
        console.error("JWT verification failed:", error)
        res.status(403).json({ message: "Forbidden" })
        return;
    }
}