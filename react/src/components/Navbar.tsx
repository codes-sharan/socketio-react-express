import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="p-4 border-b flex justify-between">
    <Link to="/" className="font-bold text-lg">
      ShopMate
    </Link>
    <div className="space-x-4">
      <Link to="/login" className="text-blue-600 hover:underline">
        Login
      </Link>
      <Link to="/register" className="text-blue-600 hover:underline">
        Register
      </Link>
    </div>
  </nav>
);
