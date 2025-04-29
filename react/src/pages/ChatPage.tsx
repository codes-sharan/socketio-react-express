import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { io, Socket } from "socket.io-client";

interface Message {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  receiver: {
    _id: string;
    username: string;
  };
  message: string;
  time: string;
}

const ChatPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const currentUser = localStorage.getItem("username"); // or get from auth context

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io("http://localhost:9005", {
      auth: { token },
    });
    socketRef.current = socket;
    // load past messages
    fetch(`http://localhost:9005/api/chat/${currentUser}/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => {
        // Ensure we always set an array
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setMessages([]); // Reset to empty array on error
      });

    // Listen to incoming messages
    socket.on("receive_message", (msg: Message) => {
      if (
        (msg.sender === currentUser && msg.receiver === username) ||
        (msg.sender === username && msg.receiver === currentUser)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
      // Generate consistent room ID from both usernames
      const roomId = [currentUser, username].sort().join("-");
      socket.emit("join_room", roomId);
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      sender: currentUser,
      receiver: username,
      message: input.trim(),
    };

    socketRef.current?.emit("send_message", messageData);
    setMessages((prev) => [
      ...prev,
      { ...messageData, time: new Date().toISOString() },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 border rounded">
      <h2 className="text-2xl font-semibold mb-4">Chat with {username}</h2>
      <div className="h-96 overflow-y-auto border p-4 space-y-2 bg-gray-50 rounded">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded w-fit max-w-xs text-sm ${
              msg.sender.username === currentUser
                ? "bg-blue-100 ml-auto"
                : "bg-gray-200"
            }`}
          >
            <p>{msg.message}</p>
            <p className="text-xs text-right text-gray-500">
              {new Date(msg.time).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatPage;
