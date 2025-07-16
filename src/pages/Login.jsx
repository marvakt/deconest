import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${formData.email}&password=${formData.password}`
      );

      if (res.data.length === 0) {
        setError("Invalid email or password.");
        return;
      }

      const user = res.data[0];
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md border border-black p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-sm mb-6 text-center text-gray-600">Log in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
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
