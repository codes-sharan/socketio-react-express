const { register, login } = require("../controllers/authController");
const User = require("../models/User");
const { auth } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// // GET /api/users
// routes/user.js - add role-based filtering
router.get("/", auth, async (req, res) => {
  const currentUser = await User.findById(req.user.id);

  let filter = {};
  if (currentUser.role === "buyer") {
    filter = { role: { $in: ["admin", "seller"] } };
  } else if (currentUser.role === "seller") {
    filter = {
      $or: [
        { role: "admin" },
        {
          /* your customers */
        },
      ],
    };
  }

  const users = await User.find(filter);
  res.json(users);
});

module.exports = router;
