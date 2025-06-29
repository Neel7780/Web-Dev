const mongoose = require("mongoose")
const schema = mongoose.schema
const objectid = mongoose.objectid

const user = new schema ({
    email : String,
    password : {type : String, unique : true},
    name : String
})

const todo = new Schema({
    title : String,
    done : Boolean,
    userid : objectid
})

const UserModel = mongoose.model("user", users)
const TodoModel = mongoose.model("todo", todos)

module.exports({
    UserModel,
    TodoModel
})