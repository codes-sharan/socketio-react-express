require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const connectDB = require("./db/config.js");

const Chat = require("./models/Chat");
const verifyToken = require("./middleware/verifyToken.js");
const User = require("./models/User");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/users", userRoutes);

app.get("/api/chat/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    // Convert usernames to user IDs
    const user1Data = await User.findOne({ username: user1 });
    const user2Data = await User.findOne({ username: user2 });

    if (!user1Data || !user2Data) {
      return res.status(404).json({ error: "User not found" });
    }

    const messages = await Chat.find({
      $or: [
        { sender: user1Data._id, receiver: user2Data._id },
        { sender: user2Data._id, receiver: user1Data._id },
      ],
    })
      .sort({ time: 1 })
      .populate("sender receiver", "username");

    res.json(messages);
  } catch (error) {
    console.error("Chat history error:", error);
    res.status(500).json({ error: "Server error retrieving messages" });
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const user = verifyToken(token);

  if (user) {
    socket.user = user; // Attach user to socket for later use
    next();
  } else {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", async (data) => {
    try {
      // Validate users exist
      const sender = await User.findOne({ username: data.sender });
      const receiver = await User.findOne({ username: data.receiver });

      if (!sender || !receiver) {
        return socket.emit("error", "Invalid user specified");
      }

      const newMessage = new Chat({
        sender: sender._id,
        receiver: receiver._id,
        message: data.message,
      });

      await newMessage.save();

      // Populate before sending back to client
      const populatedMsg = await Chat.populate(newMessage, {
        path: "sender receiver",
        select: "username",
      });

      const roomId = [data.sender, data.receiver].sort().join("-");
      io.to(roomId).emit("receive_message", populatedMsg);
    } catch (error) {
      console.error("Message send error:", error);
      socket.emit("error", "Failed to send message");
    }
  });
});

server.listen(9005, () => {
  console.log("Server is running on http://localhost:9005");
});
