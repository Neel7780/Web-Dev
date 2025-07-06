
import { Client } from "pg";
const pgClient = new Client('postgresql://neondb_owner:npg_MN3U2kEiJFAV@ep-mute-voice-a8lz4yhi-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require');

async function main() {
    await pgClient.connect();
    await addUser("efedvdv", "2fefn@gamsvnevene", "22222cscdw");
    await getUser("2fefn@gamsm");
}

async function addUser(username: string, email: string, password: string) {
    try {
        const values = [username, email, password];
        const inputQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
        await pgClient.query(inputQuery, values);
    } catch (e) {
        console.log(e, "some error occured");
    }
}

async function getUser(email: string) {
    try {
        const values = [email];
        const inputQuery = `SELECT * FROM users WHERE email = $1`;
        await pgClient.query(inputQuery, values);
    } catch (e) {
        console.log(e, "error occured");
    }
}

main();