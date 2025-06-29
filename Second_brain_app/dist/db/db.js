"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Content = exports.User = exports.Tag = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect("mongodb+srv://neel212006:IzcVwTx8EkU2NfIA@neel212006.zpfjulr.mongodb.net/second-brain-app");
const userSchema = new mongoose_2.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const tagSchema = new mongoose_2.Schema({
    title: { type: String, required: true, unique: true }
});
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const contentSchema = new mongoose_2.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
});
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
});
const Tag = mongoose_1.default.model('Tag', tagSchema);
exports.Tag = Tag;
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Content = mongoose_1.default.model('Content', contentSchema);
exports.Content = Content;
const Link = mongoose_1.default.model('Link', linkSchema);
exports.Link = Link;
