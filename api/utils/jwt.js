const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET; // Use process.env.JWT_SECRET in production

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    SECRET,
    { expiresIn: "1d" }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
