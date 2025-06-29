import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_PASSWORD = "neel2222";

interface AuthRequest extends Request {
    username?: string;
}

export async function middleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    try {
        const decoded = jwt.verify(token as string, JWT_PASSWORD) as { username: string };
        req.username = decoded.username;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(403).json({ message: "Forbidden" });
    }
}