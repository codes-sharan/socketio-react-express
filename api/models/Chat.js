// models/Chat.js
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);
