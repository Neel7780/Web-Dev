"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const zod_1 = require("zod");
const db_1 = require("./../db/db");
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.z.object({
        username: zod_1.z.string().min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Password cannot exceed 10 characters" }),
        password: zod_1.z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .max(20, { message: "Password must not exceed 20 characters" })
            .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Must contain at least one number" })
            .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" })
    });
    const content = requiredbody.safeParse(req.body);
    if (!content.success) {
        res.status(411).json({
            message: "Invalid inputs",
            issues: content.error.format()
        });
        return;
    }
    const { username, password } = content.data;
    const existingUser = yield db_1.User.findOne({ username });
    if (existingUser) {
        res.status(403).json({ message: "User already exists with this username" });
    }
    try {
        // Simulate user creation
        yield db_1.User.create({ username, password });
        res.status(200).json({ message: "Signed up" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
router.get("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
