import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
      <Link to="/products" className="font-bold text-lg">
        ShopAPI
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm text-gray-300">Hi, {user.name}</span>
            <Link to="/products/new" className="text-sm hover:underline">
              Add Product
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-sm hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
