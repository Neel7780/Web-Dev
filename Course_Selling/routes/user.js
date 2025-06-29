const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = require("../config").JWT_USER_PASSWORD;
const userMiddleware = require("../middlewares/user").userMiddleware;
const express = require("express");
const { userModel, courseModel} = require("../db/db");
const userRouter = express.Router();
const {z} = require("zod");
const bcrypt = require("bcrypt");

userRouter.post("/signup", async (req, res) => {
    const requiredbody = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });
    
    const parseDatawithSuccess = requiredbody.safeParse(req.body);

    if(!parseDatawithSuccess.success){
        return res.status(401).json({
            message: "Invalid data format",
            error: parseDatawithSuccess.error
        })
    } 

    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 5); // Hash the password

        const newUser = new userModel({ email : email, password : hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
);
userRouter.post("/signin", async (req, res) => {
    const requiredbody = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });
    const parseDatawithSuccess = requiredbody.safeParse(req.body);
    if (!parseDatawithSuccess.success) {
        return res.status(401).json({
            message: "Invalid data format",
            error: parseDatawithSuccess.error
        });
    }
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email }); 
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = bcrypt.compare(password, user.password); // Compare the hashed password
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, JWT_USER_PASSWORD);
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error signing in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

//purchase a course
userRouter.post("/courses/:courseId", userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    try {
        // Fetch the user document from DB
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Prevent duplicate purchases
        if (user.purchasedCourses.includes(courseId)) {
            return res.status(400).json({ message: "Course already purchased" });
        }

        user.purchasedCourses.push(courseId);
        await user.save();

        res.status(200).json({
            message: "Course purchased successfully",
        });
    } catch (e) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

// Get all purchased courses
userRouter.get("/purchased-courses", userMiddleware, async (req, res) => {
    const user = await userModel.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const purchasedCourses = await courseModel.find({
            _id: { $in: user.purchasedCourses }
        });
        res.status(200).json(purchasedCourses);
    } catch (error) {
        console.error("Error fetching purchased courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all courses
userRouter.get("/courses", userMiddleware, async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = {
    userRouter
};