import express from "express"
const router = express.Router()
import {z} from "zod"
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
const JWT_PASSWORD = "neel2222"

import {middleware} from "./../middlewares/middleware"

import {User} from "./../db/db"

router.post("/signup", async (req, res) => {
    const requiredbody = z.object({
        username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Password cannot exceed 10 characters" }),
        password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must not exceed 20 characters" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" })
    });

    const content = requiredbody.safeParse(req.body)

    if(!content.success){
        res.status(411).json({
            message : "Invalid inputs",
            issues : content.error.format()
        })
        return;
    }

    const { username, password } = content.data;

    const existingUser = await User.findOne({ username });
    if(existingUser){
        res.status(403).json({ message: "User already exists with this username" });
    }

    const hashedPwd = await bcrypt.hash(password, 5)

    try {
        // Simulate user creation
        await User.create({ username, hashedPwd });
        res.status(200).json({ message: "Signed up" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
    
router.get("/signin", async (req, res) => {
    const requiredbody = z.object({
        username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Password cannot exceed 10 characters" }),
        password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must not exceed 20 characters" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" })
    });

    const content = requiredbody.safeParse(req.body)

    if(!content.success){
        res.status(411).json({
            message : "Invalid inputs",
            issues : content.error.format()
        })
        return;
    }

    const { username, password } = content.data;

    try {
        const user = await User.findOne({ username })
        if(!user){
            res.status(403).json({"message" : "User not found"})
        }

        // @ts-ignore
        const checkPwd = bcrypt.compare(password, user.password) 
        if(!checkPwd){
            res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            // @ts-ignore
            id: user._id,
            // @ts-ignore
            username: user.username
        }, JWT_PASSWORD);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error signing in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export { router }