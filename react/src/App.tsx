import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Navbar } from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import UserListPage from "./pages/UserListPage";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:username" element={<ChatPage />} />

        <Route path="/users" element={<UserListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
