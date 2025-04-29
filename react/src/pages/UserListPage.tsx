import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface User {
  username: string;
  role: string;
}

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:9005/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">Start a Chat</h2>
      <div className="grid gap-4">
        {users.map((user, i) => (
          <Card
            key={i}
            className="p-4 cursor-pointer hover:bg-blue-50 transition"
            onClick={() => navigate(`/chat/${user.username}`)}
          >
            <p className="text-lg font-medium">{user.username}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
