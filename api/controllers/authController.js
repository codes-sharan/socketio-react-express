const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = new User({ username, password, role });
    await user.save();

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res
      .status(400)
      .json({ error: "User registration failed", details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return both token AND username
    res.json({
      token: generateToken(user), // Your token generation function
      username: user.username, // Add this line
      role: user.role, // Good to include role too
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};
