import express from "express"
const router = express.Router()
import {z} from "zod"
import bcrypt from "bcrypt"
import { Request, Response} from "express";

import {randomHash} from "./../utils"

import jwt from "jsonwebtoken"
const JWT_PASSWORD = "neel2222"

import {middleware} from "./../middlewares/middleware"

import {User, Tag, Content, Link} from "./../db/db"

router.post("/signup", async (req: Request, res:  Response) => {
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
        await User.create({ username : username, password : hashedPwd });
        res.status(200).json({ message: "Signed up" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
    
router.post("/signin", async (req: Request, res: Response) => {
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

router.post("/content", middleware, async (req: Request, res: Response) => {
    const requiredbody = z.object({
        link: z.string(),
        type: z.enum(['image', 'video', 'article', 'audio'], { message: "Invalid content type" }),
        title: z.string().min(1, { message: "Title cannot be empty" })
    });
    const content = requiredbody.safeParse(req.body)
    if(!content.success){
        res.status(411).json({
            message : "Invalid inputs",
            issues : content.error.format()
        })
        return;
    }
    // @ts-ignore
    const username = req.username;
    const user = await User.findOne({username})
    if(!user){
        res.status(403).json({
            message: "User not found"
        })
        return;
    }
    await Content.create({
        link: content.data.link,
        type: content.data.type,
        title: content.data.title,
        userId: user._id,
        tags: []
    })

    res.json({
        message: "Content added"
    })
})

router.get("/content", middleware, async (req: Request, res: Response) => {
    // @ts-ignore
    const username = req.username;
    const user = await User.findOne({ username });
    if (!user) {
        res.status(403).json({
            message: "User not found"
        });
        return;
    }

    const content = await Content.find({ userId: user._id }).populate("userId", "username");
    res.json(content);
})

router.delete("/content", middleware, async (req: Request, res: Response) => {
    const contentId = req.body.contentId;

    await Content.deleteOne({
        _id: contentId,
        // @ts-ignore
        userId: req.username._id
    })

    res.json({
        message: "Deleted"
    })
})

router.post("/share", middleware, async (req: Request, res: Response) => {
    const canShare = req.body.share;
    // @ts-ignore
    const user = await User.findOne({ username: req.username })
    if(!user){
        res.status(404).json({message : "Error finding user"})
        return;
    }
    if(canShare){
        const hash = randomHash(10)
        await Link.create({
            hash : hash,
            userId : user._id 
        })
        res.json({
            hash : hash,
            message : "Link Created!"
        })
    } else {
        await Link.deleteOne({
            userId : user._id
        })
        res.json({message : "Link wont be provided!"})
    }
})

router.get("/share/:sharedLink", async (req: Request, res: Response) => {
    const hash = req.params.sharedLink;
    const resposne = await Link.findOne({
        hash : hash
    })
    if(!resposne){
        res.status(411).json({message : "Invalid Link"})
        return;
    } 
    const user = await User.findOne({
        _id : resposne.userId
    })
    if(!user){
        res.status(404).json({ message : "Unable to find user." })
        return;
    }
    const content = await Content.findOne({
        userId : user._id
    })

    res.json({
        content : content
    })
})

export { router }