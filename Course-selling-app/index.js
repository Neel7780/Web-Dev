const express = require("express")
const app = express()

// Import the admin and user routes
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/users");

app.use(express.json())

// Set up routing for admin and user endpoints
app.use("/admin", adminRouter); // Route all admin-related requests to the admin router
app.use("/user", userRouter); // Route all user-related requests to the user router

app.listen(3000, () => {
    console.log("Server is running on port 3000"); // Log the server status to the console
});