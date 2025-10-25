


// import React, { useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { authContext } from "../context/AuthContext";

// const BASE_URL = "http://127.0.0.1:8000/api/";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useContext(authContext);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.username || !formData.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(`${BASE_URL}users/login/`, formData);
      
//       const { tokens, user } = response.data;

//       // ✅ CRITICAL: Save ALL required data to localStorage with correct keys
//       localStorage.setItem("access_token", tokens.access);
//       localStorage.setItem("refresh_token", tokens.refresh);
//       localStorage.setItem("loggedInUser", JSON.stringify(user)); // For AuthContext & CartContext
//       localStorage.setItem("user", JSON.stringify(user)); // For MyOrders (if you want backward compatibility)

//       // After successful login
//       login(user, tokens); // AuthContext saves user and tokens

//       toast.success(`Welcome back, ${user.username}!`);
//       navigate("/"); // No need for window.location.reload()

  
      
//     } catch (error) {
//       console.error("Login error:", error);
      
//       if (error.response?.status === 401) {
//         toast.error("Invalid username or password");
//       } else if (error.response?.data?.error) {
//         toast.error(error.response.data.error);
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           {/* Header */}
//           <div className="text-center">
//             <h2 className="text-4xl font-light text-gray-900 mb-2">Welcome Back</h2>
//             <p className="text-gray-600 font-light">Sign in to your account</p>
//           </div>

//           {/* Form Card */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Username */}
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your username"
//                   disabled={isLoading}
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your password"
//                   disabled={isLoading}
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </form>

//             {/* Sign Up Link */}
//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{" "}
//                 <Link
//                   to="/signup"
//                   className="font-medium text-amber-600 hover:text-amber-500 transition-colors duration-200"
//                 >
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;



// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://127.0.0.1:8000/api/";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}users/login/`, formData);
      const { tokens, user } = response.data;

      // Save user & tokens in AuthContext and localStorage
      login(user, tokens);

      toast.success(`Welcome back, ${user.username}!`);
      navigate("/"); // Navigate to home or dashboard
    } catch (error) {
      console.error("Login error:", error);
      const msg = error.response?.data?.error || "Login failed. Try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30 py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-light text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 font-light">Sign in to your account</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-500 transition-all duration-300"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-amber-600 hover:text-amber-500">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
