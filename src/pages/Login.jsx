import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    // Store session
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

    // Redirect based on role
    if (matchedUser.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md border border-black p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-sm mb-6 text-center text-gray-600">Log in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="flex justify-between text-sm mb-1 font-medium">
              <span>Password</span>
              <a href="/forgot-password" className="text-sm underline text-gray-500 hover:text-black">
                Forgot password?
              </a>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded text-base font-semibold hover:bg-gray-800 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="underline hover:text-black font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
