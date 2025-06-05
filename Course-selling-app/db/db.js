const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const UserSchema = new Schema({
    email : { type: String, unique: true },
    password : String,
    purchasedCourses : [
        {
            type: mongoose.Schema.Types.ObjectId, // Reference to Course model
            ref: "Course",
        }
    ]
})

const AdminSchema = new Schema({
    email : { type: String, unique: true },
    password : String
})

const CourseSchema = new Schema({
    title : String,
    description : String,
    imagelink : String,
    price : Number,
    creatorId : ObjectId // Reference to the creator's ObjectId (Admin)
})

const Course = mongoose.model("course", CourseSchema)
const Admin = mongoose.model("admin", AdminSchema) 
const User = mongoose.model("user", UserSchema)

module.exports = {
    Admin,
    Course,
    User
}