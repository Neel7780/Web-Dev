const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD=process.env.JWT_ADMIN_PASSWORD
const MONGO_URL=process.env.MONGO_URL
if (!JWT_USER_PASSWORD || !JWT_ADMIN_PASSWORD || !MONGO_URL) {
    throw new Error("Missing required environment variables");
}

module.exports = {
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD,
    MONGO_URL
}