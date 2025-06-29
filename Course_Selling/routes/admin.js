const express = require("express");
const { adminMiddleware } = require("../middlewares/admin");
const { adminModel, courseModel } = require("../db/db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = require("../config").JWT_ADMIN_PASSWORD;
const { z } = require("zod");
const bcrypt = require("bcrypt");

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => { 
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
        const existingAdmin = await adminModel.find({ email });
        if (existingAdmin.length > 0) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 5); // Hash the password
        const newAdmin = new adminModel({ email : email, password : hashedPassword });
        await newAdmin.save();
        return res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        console.error("Error creating admin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

adminRouter.post("/signin", async (req, res) => {
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
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_ADMIN_PASSWORD);
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error signing in admin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
);

//create a course
adminRouter.post("/courses", adminMiddleware, async (req, res) => {
    const { title, description, price } = req.body;
    try {
        const newCourse = new courseModel({ title, description, price, creatorId: req.admin.id });
        await newCourse.save();
        return res.status(201).json({ message: "Course created successfully" });
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

//update a course
adminRouter.put("/courses", adminMiddleware, async (req, res) => {
    const { courseId, title, description, price } = req.body;

    const admin = req.admin;

    const course = await courseModel.findById({
        _id : courseId,
        creatorId : admin._id
    })

    // If the course is not found, respond with an error message
    if (!course) {
        return res.status(404).json({
            message: "Course not found!", // Inform the client that the specified course does not exist
        });
    }

    await course.updateOne({
        title : title || course.title, // update if given in body or keep old one
        description : description || course.description,
        price : price || course.price
    })

    res.status(200).json({
        message: "Course updated successfully", // Confirm successful course update
    });
});

//delete a course
adminRouter.delete("/courses", adminMiddleware, async (req, res) => {
    const { courseId } = req.body;

    const admin = req.admin;

    const course = await courseModel.findById({
        _id : courseId,
        creatorId : admin._id
    })

    // If the course is not found, respond with an error message
    if (!course) {
        return res.status(404).json({
            message: "Course not found!", // Inform the client that the specified course does not exist
        });
    }

    await courseModel.deleteOne({ _id: courseId });

    res.status(200).json({
        message: "Course deleted successfully", // Confirm successful course deletion
    });
});

adminRouter.get("/courses", adminMiddleware, async (req, res)=>{
    const response = await courseModel.find({})
    res.status(200).json({
        response // Return the array of courses
    });
})

module.exports = {
    adminRouter
}