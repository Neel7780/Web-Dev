import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../configs";

interface AuthRequest extends Request {
    username?: string;
}

export function middleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({ message: "Forbidden: No token provided" });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token as string, JWT_PASSWORD) as { username: string };
        req.username = decoded.username;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(403).json({ message: "Forbidden" });
    }
}