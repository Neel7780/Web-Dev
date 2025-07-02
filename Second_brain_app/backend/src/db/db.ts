import mongoose from "mongoose";
import { Schema, ObjectId } from "mongoose";

mongoose.connect("mongodb+srv://neel212006:IzcVwTx8EkU2NfIA@neel212006.zpfjulr.mongodb.net/second-brain-app")

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const tagSchema = new Schema({
    title : {type : String, required : true, unique :  true}
})

const contentTypes = ["youtube", "twitter"]; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Tag = mongoose.model('Tag', tagSchema);
const User = mongoose.model('User', userSchema);
const Content = mongoose.model('Content', contentSchema);
const Link = mongoose.model('Link', linkSchema);

export {
    Tag,
    User,
    Content,
    Link
}