// migrate-chats.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Chat = require("./models/Chat");

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);

  const chats = await Chat.find();

  for (const chat of chats) {
    const sender = await User.findOne({ username: chat.sender });
    const receiver = await User.findOne({ username: chat.receiver });

    if (sender && receiver) {
      chat.sender = sender._id;
      chat.receiver = receiver._id;
      await chat.save();
    }
  }

  console.log("Migration completed");
  process.exit();
}

migrate();
