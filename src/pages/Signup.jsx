



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../utils/axiosInstance";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     const newUser = {
//       username: formData.username,
//       email: formData.email,
//       password: formData.password,
//       role: formData.email === "admin@gmail.com" ? "admin" : "user",
//     };

//     try {
//       // ✅ Connect to Django backend
//       const res = await axiosInstance.post("users/register/", newUser);

//       if (res.status === 201) {
//         toast.success("Signup successful!");
//         navigate("/login"); // ✅ Redirect to login
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       if (error.response) {
//         // show backend validation errors if any
//         const backendError =
//           error.response.data?.email?.[0] ||
//           error.response.data?.username?.[0] ||
//           error.response.data?.password?.[0] ||
//           error.response.data?.detail ||
//           "Signup failed. Please try again.";
//         toast.error(backendError);
//       } else {
//         toast.error("Something went wrong. Try again.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 relative overflow-hidden">
//       {/* Decorative background elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200/30 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="w-full max-w-md relative z-10">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-block p-3 bg-black rounded-2xl shadow-lg mb-4">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//             </svg>
//           </div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
//           <p className="text-gray-600">Join DecoNest to discover beautiful decor pieces</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Full Name */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">Full Name</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Enter your full name"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Username */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">Username</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   placeholder="Choose a username"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">Email</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Create a password"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm your password"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Terms & Conditions */}
//             <div className="flex items-start">
//               <input
//                 type="checkbox"
//                 name="agree"
//                 checked={formData.agree}
//                 onChange={handleChange}
//                 className="mt-1 mr-3 w-4 h-4 accent-black"
//                 required
//               />
//               <label className="text-sm text-gray-600">
//                 I agree to the <span className="text-gray-900 font-semibold hover:underline cursor-pointer">Terms and Conditions</span>
//               </label>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-3.5 px-4 bg-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-gray-900 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
//             >
//               <span>Create Account</span>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </button>
//           </form>

//           {/* Login Link */}
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link to="/login" className="font-semibold text-gray-900 hover:text-black transition-colors duration-200 hover:underline">
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <p className="text-center text-xs text-gray-500 mt-6">
//           By signing up, you agree to our Terms of Service and Privacy Policy
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const newUser = {
      full_name: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.email === "admin@gmail.com" ? "admin" : "user",
    };

    try {
      const res = await axiosInstance.post("users/register/", newUser);

      if (res.status === 201) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response) {
        const backendError =
          error.response.data?.email?.[0] ||
          error.response.data?.username?.[0] ||
          error.response.data?.password?.[0] ||
          error.response.data?.detail ||
          "Signup failed. Please try again.";
        toast.error(backendError);
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-black rounded-2xl shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">
            Join DecoNest to discover beautiful decor pieces
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-gray-50 hover:bg-white"
                required
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-gray-50 hover:bg-white"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-gray-50 hover:bg-white"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-gray-50 hover:bg-white"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-gray-50 hover:bg-white"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 mr-3 w-4 h-4 accent-black"
                required
              />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="text-gray-900 font-semibold hover:underline cursor-pointer">
                  Terms and Conditions
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-black text-white rounded-xl font-semibold shadow-lg hover:bg-gray-900 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-gray-900 hover:text-black transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Signup;
