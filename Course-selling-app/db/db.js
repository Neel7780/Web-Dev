const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect("mongodb+srv://neel212006:IzcVwTx8EkU2NfIA@neel212006.zpfjulr.mongodb.net/course-selling-app")

const UserSchema = new Schema({
    email : String,
    password : String,
    purchasedCourses : [
        {
            type: mongoose.Schema.Types.ObjectId, // Reference to Course model
            ref: "Course",
        }
    ]
})

const AdminSchema = new Schema({
    email : String,
    password : String
})

const CourseSchema = new Schema({
    title : String,
    description : String,
    imagelink : String,
    price : Number
})

const Course = mongoose.model("course", CourseSchema)
const Admin = mongoose.model("admin", AdminSchema) 
const User = mongoose.model("user", UserSchema)

module.exports = {
    Admin,
    Course,
    User
}