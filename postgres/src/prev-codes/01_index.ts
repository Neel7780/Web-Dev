import { Client } from "pg";
const pgClient = new Client("postgresql://neondb_owner:npg_MN3U2kEiJFAV@ep-mute-voice-a8lz4yhi-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require");
pgClient.connect() //await this inside main function normally

import express from "express";
const app = express();
app.use(express.json())
app.listen(3000)

app.post("/", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const values = [username, email, password];
    try {
        await pgClient.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`, values); //using this syntax so as to stop sql injections (like running sql commands in user input fields)
        res.status(201).json({ message: "User created successfully" });
    } catch (e) {
        console.log(e, "Some error occured");
        res.status(500).json({ error: "Database error" });
    }
});