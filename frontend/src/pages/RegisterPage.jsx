import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await register(form.name, form.email, form.password, form.confirmPassword);
      navigate("/login");
    } catch (err) {
      // err could be { message } or { errors: [...] }
      if (err.errors) {
        setError(err.errors.map((e) => e.msg).join(", "));
      } else {
        setError(err.message || "Registration failed");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
