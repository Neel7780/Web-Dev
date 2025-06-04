const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  // const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    req.email = decoded.email; // Make sure you set email in the JWT payload!
    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid token" });
  }
};