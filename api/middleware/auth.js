const { verifyToken } = require("../utils/jwt");

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalid or expired" });
  }
};
