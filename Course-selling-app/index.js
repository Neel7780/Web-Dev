require("dotenv").config();
console.log("Loaded env MONGO_URL:", process.env.MONGO_URL);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Import the admin and user routes
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/users");

app.use(express.json())

// Set up routing for admin and user endpoints
app.use("/admin", adminRouter); // Route all admin-related requests to the admin router
app.use("/user", userRouter); // Route all user-related requests to the user router

async function main() {
    try {
        console.log("MOngo url", MONGO_URL);
        await mongoose.connect(MONGO_URL);
        console.log("Connected to the database");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
}

main();
