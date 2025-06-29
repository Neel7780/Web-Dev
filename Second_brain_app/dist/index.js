"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const v1_1 = require("./routes/v1");
const PORT = 3000;
app.use(express_1.default.json());
app.use("/api/v1", v1_1.router);
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
