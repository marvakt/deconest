



// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import axios from "axios";
// // import { toast } from "react-hot-toast"; 
// // import { useAuth } from "../context/AuthContext";

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: ""
// //   });
// //   const [errors, setErrors] = useState({});

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value
// //     }));
// //     setErrors((prev) => ({
// //       ...prev,
// //       [e.target.name]: ""
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const newErrors = {};
// //     if (!formData.email) newErrors.email = "Email is required";
// //     if (!formData.password) newErrors.password = "Password is required";
// //     if (Object.keys(newErrors).length > 0) {
// //       setErrors(newErrors);
// //       return;
// //     }

// //     try {
// //       const res = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
// //       const user = res.data[0];

// //       if (!user) {
// //         toast.error("User not found");
// //         return;
// //       }

// //       if (user.password !== formData.password) {
// //         toast.error("Invalid password");
// //         return;
// //       }

// //       // ✅ Check if the user is blocked
// //       if (user.isBlocked) {
// //         toast.error("You are blocked by admin");
// //         return;
// //       }

// //       // ✅ Successful login
// //       login(user);

// //       setTimeout(() => {
// //         if (user.role === "admin") {
// //           toast.success("Welcome Admin!");
// //           navigate("/admin/dashboard", { replace: true });
// //         } else {
// //           toast.success("Login successful!");
// //           navigate("/", { replace: true });
// //         }
// //       }, 100);
// //     } catch (err) {
// //       console.error("Login error:", err);
// //       toast.error("Something went wrong");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
// //       >
// //         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

// //         <div className="mb-4">
// //           <label className="block mb-1 font-medium">Email</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="w-full border px-3 py-2 rounded-md"
// //           />
// //           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
// //         </div>

// //         <div className="mb-6">
// //           <label className="block mb-1 font-medium">Password</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             className="w-full border px-3 py-2 rounded-md"
// //           />
// //           {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
// //         >
// //           Login
// //         </button>

// //         <p className="mt-4 text-center text-sm text-gray-600">
// //           Don't have an account?{" "}
// //           <Link to="/signup" className="text-blue-600 hover:underline font-medium">
// //             Sign Up
// //           </Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast"; 
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//     setErrors((prev) => ({
//       ...prev,
//       [e.target.name]: ""
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Frontend validation
//     const newErrors = {};
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       // ✅ POST request to Django backend login
//       const res = await axios.post("http://127.0.0.1:8000/api/login/", {
//         username: formData.email,
//         password: formData.password,
//       });

//       const { tokens, user } = res.data;

//       // ✅ Save JWT tokens in localStorage
//       localStorage.setItem("access_token", tokens.access);
//       localStorage.setItem("refresh_token", tokens.refresh);
//       localStorage.setItem("user", JSON.stringify(user));

//       // ✅ Update AuthContext
//       login(user);

//       // ✅ Redirect based on role
//       setTimeout(() => {
//         if (user.role === "admin") {
//           toast.success("Welcome Admin!");
//           navigate("/admin/dashboard", { replace: true });
//         } else {
//           toast.success("Login successful!");
//           navigate("/", { replace: true });
//         }
//       }, 100);

//     } catch (err) {
//       console.error("Login error:", err);
//       // Show proper backend error
//       if (err.response) {
//         toast.error(err.response.data.error || "Login failed");
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-md"
//           />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1 font-medium">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-md"
//           />
//           {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
//         >
//           Login
//         </button>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-600 hover:underline font-medium">
//             Sign Up
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axiosInstance.post("users/login/", {
        username: formData.username,
        password: formData.password,
      });

      const { tokens, user } = res.data;

      // Save tokens in localStorage
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      login(user);

      if (user.role === "admin") {
        toast.success("Welcome Admin!");
        navigate("/admin/dashboard", { replace: true });
      } else {
        toast.success("Login successful!");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        toast.error(err.response.data.error || "Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
