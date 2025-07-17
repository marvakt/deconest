import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.email === "admin@gmail.com" ? "admin" : "user",
    };

    try {
      
      const res = await axios.get(
        `http://localhost:3000/users?email=${newUser.email}`
      );

      if (res.data.length > 0) {
        alert("User already exists");
        return;
      }

      
      await axios.post("http://localhost:3000/users", newUser);

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong during signup. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md border border-black p-6 rounded-md shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
        <p className="text-sm mb-6 text-center">
          Join DecoNest to discover beautiful decor pieces
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded text-base"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 border rounded text-base"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded text-base"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded text-base"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border rounded text-base"
            required
          />

          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mr-2"
              required
            />
            I agree to the Terms and Conditions
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded text-base font-medium"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
