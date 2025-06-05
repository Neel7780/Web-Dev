const express = require("express")
const router = express.Router()
const adminMiddleware = require("../middlewares/admin")
const { Admin, Course } = require("../db/db");
const {z} = require("zod")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require("../config")

router.post("/signup", async (req,res)=>{
    const requireBody = z.object({
        email : z.string().unique(),
        password : z.string(),
    })

    const parseDatawithSuccess = requireBody.safeParse(req.body)

    if(!parseDatawithSuccess.success){
        return res.status(401).json({
            message: "Invalid data format",
            error: parseDatawithSuccess.error
        })
    } else{
        const email = req.body.email;
        const password = req.body.password;

        const hashedpassword = await bcrypt.hash(password, 5)

        try{
            await Admin.create({
                email : email,
                password : hashedpassword
            })
        } catch(e){
            res.json({
                message : "User already exists!"
            })
        }

        res.json({
            message: "You are signed up!"
        })
    }

})

router.post("/signin", async (req,res)=>{
    const requireBody = z.object({
        email : z.string(),
        password : z.string(),
    })

    const parseDatawithSuccess = requireBody.safeParse(req.body)

    if(!parseDatawithSuccess.success){
        return res.status(401).json({
            message: "Invalid data format",
            error: parseDatawithSuccess.error
        })
    } else{
        const email = req.body.email;
        const password = req.body.password;

        const user = await Admin.findOne({
            email: email
        })

        if(!user){
            res.sendStatus(401).json({
                message: "invalid credentials"
            })
        } else{
            const passwordMatch = await bcrypt.compare(password, user.password)
            if(passwordMatch){
                const token = jwt.sign({
                    id : user._id.toString(),
                    email : user.email
                }, JWT_ADMIN_PASSWORD)
                res.json({
                    message : "You are signed in!",
                    token : token
                }) 
            } else{
                res.status(403).json({
                    message: "invalid credentials"
                })
            }
        } 
    }
})

// Creating courses
router.post("/courses", adminMiddleware, async (req,res)=>{
     // Extract course details from request body
    const title = req.body.title;
    const description = req.body.description;
    const imagelink = req.body.imagelink;
    const price = req.body.price;

    // creator id
    const admin = await Admin.findOne({
        email : req.email
    })
    const creatorId = admin._id

    const newCourse = await Course.create({
        title : title,
        description : description,
        imagelink : imagelink,
        price : price,
        creatorId : creatorId
    })

    // Respond with the newly created course ID and a success message
    res.status(201).json({
        message: "Course created successfully", // Confirm course creation
        courseId: newCourse._id, // Return the ID of the newly created course
    });
})

// Route for updating a course (admin-protected)
router.put("/course", adminMiddleware, async (req, res)=>{
    const { courseId, title, description, imagelink, price } = req.body;

    const admin = await Admin.findOne({
        email : req.email
    })

    const course = await Course.findById({
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
        imagelink : imagelink || course.imagelink,
        price : price || course.price
    })

    res.status(200).json({
        message: "Course updated successfully", // Confirm successful course update
    });
})

// Route for deleting a course (admin-protected)
router.delete("/courses", adminMiddleware, async (req,res)=>{
    const courseId = req.body.courseId

    const course = await Course.findById(courseId);

    // If the course is not found, respond with an error message
    if (!course) {
        return res.status(404).json({
            message: "Course not found!", // Inform the client that the specified course does not exist
        });
    }
    await Course.deleteOne({
        _id : courseId,
    })

    res.status(200).json({
        message: "Course deleted successfully", // Confirm successful course update
    });
})

// Route for fetching all courses (admin-protected)
router.get("/courses", adminMiddleware, async (req, res)=>{
    const response = await Course.find({})
    res.status(200).json({
        response // Return the array of courses
    });
})

module.exports = router