# Real-time Chat Feature Implementation

A full-stack real-time chat application built with React, Express, Socket.io, and MongoDB. Features user authentication, instant messaging, and message history.

![Chat Demo](https://via.placeholder.com/800x400.png?text=Chat+Demo)
_Add actual screenshot path here_

## Features

- 🔒 JWT-based user authentication
- ⚡ Real-time messaging with Socket.io
- 💾 Message persistence with MongoDB
- 📱 Responsive UI with Tailwind CSS
- 🔄 Optimistic UI updates
- 👥 User role management (admin, seller, buyer)
- 📚 Chat history per conversation
- 🔍 Error handling and validation

## Tech Stack

**Frontend:**

- React + TypeScript
- Vite
- Tailwind CSS
- Socket.io-client
- React Router

**Backend:**

- Express.js
- Socket.io
- MongoDB + Mongoose
- JWT Authentication
- REST API

## Installation

### Prerequisites

- Node.js ≥16
- MongoDB Atlas or local instance
- PNPM (optional)

### Backend Setup

cd api
pnpm install

### DOT ENV FILE

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

### Create .env file:

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=9005

### Start server:

pnpm dev

## Frontend Setup

cd client
pnpm install

### Create .env file:

VITE_API_BASE_URL=http://localhost:9005

## Start client:

pnpm dev

## Usage

- Register
  Create an account with username/password

- Login
  Use your credentials to authenticate

- Start Chat

Select user from contacts list

Begin real-time messaging

- Message Features

Instant delivery

Timestamp tracking

Message history

Typing indicators

### API Reference

Authentication
Register User
POST /api/users/register

json
{
"username": "user123",
"password": "securepass"
}
Login
POST /api/users/login

json
{
"username": "user123",
"password": "securepass"
}
Chat
Get Chat History
GET /api/chat/:user1/:user2

### WebSocket Events

send_message: Send new message

receive_message: Receive messages

typing: Show typing indicator

join_room: Join chat room

Environment Variables
Backend (api/.env)

env
MONGODB_URI=mongodb+srv://<credentials>.mongodb.net/<dbname>
JWT_SECRET=your_secure_secret
PORT=9005
Frontend (client/.env)

env
VITE_API_BASE_URL=http://localhost:9005
Deployment
Backend:

Use production process manager (PM2)

Configure CORS properly

Recommended platforms: Render, Heroku

Frontend:

Build with pnpm build

Host on Vercel/Netlify

Contributing
Fork the repository

Create feature branch (git checkout -b feature/amazing)

Commit changes (git commit -m 'Add amazing feature')

Push branch (git push origin feature/amazing)

Open Pull Request

License
MIT License

Acknowledgments
Socket.io for real-time communication

MongoDB for data persistence

React Router for navigation

Tailwind CSS for styling
