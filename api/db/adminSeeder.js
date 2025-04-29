// db/adminSeeder.js
require("dotenv").config();
const connectDB = require("./config");
const User = require("../models/User");

(async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ username: "admin" });
    if (existing) {
      console.log("ℹ️ Admin user already exists");
      process.exit(0);
    }

    const admin = new User({
      username: "admin",
      password: "admin@54321", // Consider hashing it here if needed
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder error:", err.message);
    process.exit(1);
  }
})();
