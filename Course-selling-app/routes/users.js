const express = require("express")
const router = express.Router()
const userMiddleware = require("../middlewares/users")
const { User, Course } = require("../db/db");
const {z} = require("zod")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("../config")

router.post("/signup", async (req,res)=>{
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

        const hashedpassword = await bcrypt.hash(password, 5)

        try{
            await User.create({
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

        const user = await User.findOne({
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
                }, JWT_USER_PASSWORD)
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

//route to list all courses
router.get("/courses", async (req,res)=>{
    const Courses = await Course.find({})
    res.json({
        Courses  // send array of courses
    })
})

//route to buy a course by sending course id in params
router.post("/courses/:courseId", userMiddleware, async (req,res)=>{
    const courseId = req.params.courseId
    const email = req.email

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent duplicate purchases (optional)
        if (user.purchasedCourses.includes(course._id)) {
            return res.status(409).json({ message: "Course already purchased" });
        }

        user.purchasedCourses.push(course._id);
        await user.save();

        res.status(200).json({
            message: "Course purchased successfully",
        });
    } catch(e) {
        res.status(500).json({
            message : "Internal server error"
        });
    }
})

//route to get user's purchased courses
router.get("/purchasedcourses", userMiddleware, async (req, res)=>{
    const email = req.email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Fetch courses that the user has purchased
    const courses = await Course.find({
        _id: { $in: user.purchasedCourses || [] }
    });

    res.status(200).json({
        courses,
    });
})

module.exports = router