const jwt = require("jsonwebtoken"); // Add this at the top with other requires

// Add this function after your imports
const verifyToken = (token) => {
  try {
    if (!token) return false;

    // Verify using your JWT secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // You can access the decoded user data here if needed
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return false;
  }
};
module.exports = verifyToken;
