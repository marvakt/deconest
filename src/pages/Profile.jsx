


// import React from "react";
// import Navbar from "../components/Navbar"; 

// const Profile = () => {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   if (!user) {
//     return (
//       <>
//         <Navbar />
//         <p className="text-center mt-10 text-red-500">Not logged in.</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow text-black bg-white">
//         <h2 className="text-2xl font-bold mb-4">👤 Your Profile</h2>
//         <p><strong>Name:</strong> {user.fullName || user.name || "N/A"}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Role:</strong> {user.role}</p>

//         <button
//           className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
//           onClick={() => {
//             localStorage.removeItem("loggedInUser");
//             localStorage.removeItem("cart");
//             localStorage.removeItem("wishlist");
//             window.location.href = "/login";
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </>
//   );
// };

// export default Profile;




// import React from "react";
// import Navbar from "../components/Navbar"; 

// const Profile = () => {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   if (!user) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
//           <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
//             <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
//               <span className="text-2xl">🔒</span>
//             </div>
//             <p className="text-xl font-medium text-red-600 animate-pulse">Not logged in</p>
//             <p className="text-gray-500 mt-2">Please log in to view your profile</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
//         <div className="max-w-lg mx-auto">
//           {/* Profile Card */}
//           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden backdrop-blur-sm relative group">
//             {/* Decorative background elements */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-60"></div>
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-50 to-transparent rounded-tr-full opacity-60"></div>
            
//             {/* Header section */}
//             <div className="relative p-8 pb-6">
//               <div className="flex items-center space-x-4 mb-6">
//                 <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
//                   <span className="text-2xl">👤</span>
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                     Your Profile
//                   </h2>
//                   <p className="text-gray-500 text-sm mt-1">Personal Information</p>
//                 </div>
//               </div>
              
//               {/* Divider */}
//               <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
//             </div>

//             {/* Profile Information */}
//             <div className="px-8 pb-8 space-y-4">
//               {/* Name Field */}
//               <div className="group/item relative p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 hover:shadow-md">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <span className="text-blue-600 text-sm">📝</span>
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       {user.fullName || user.name || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
//               </div>

//               {/* Email Field */}
//               <div className="group/item relative p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 hover:shadow-md">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//                     <span className="text-green-600 text-sm">✉️</span>
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
//                     <p className="text-lg font-semibold text-gray-800 break-all">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
//               </div>

//               {/* Role Field */}
//               <div className="group/item relative p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 hover:shadow-md">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//                     <span className="text-purple-600 text-sm">🏷️</span>
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-500 mb-1">Role</p>
//                     <p className="text-lg font-semibold text-gray-800 capitalize">
//                       {user.role}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
//               </div>

//               {/* Logout Button */}
//               <div className="pt-4">
//                 <button
//                   className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 ease-out hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/25 active:scale-[0.98] transform focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 relative overflow-hidden group/button"
//                   onClick={() => {
//                     localStorage.removeItem("loggedInUser");
//                     localStorage.removeItem("cart");
//                     localStorage.removeItem("wishlist");
//                     window.location.href = "/login";
//                   }}
//                 >
//                   <div className="flex items-center justify-center space-x-3">
//                     <span className="text-lg">🚪</span>
//                     <span>Logout</span>
//                   </div>
//                   {/* Shine effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 ease-out"></div>
//                 </button>
//               </div>
//             </div>

//             {/* Floating animation elements */}
//             <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
//             <div className="absolute bottom-8 right-8 w-1 h-1 bg-indigo-400 rounded-full opacity-30 animate-ping"></div>
//           </div>

//           {/* Additional decorative elements */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-400 text-sm">
//               Manage your account settings and preferences
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;





import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/users/${user.id}`);
      const currentUser = res.data;

      if (currentUser.password !== passwordData.currentPassword) {
        setPasswordError("Current password is incorrect");
        return;
      }

      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        password: passwordData.newPassword
      });

      const updatedUser = { ...user, password: passwordData.newPassword };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      setPasswordSuccess("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      setTimeout(() => {
        setPasswordSuccess("");
        setShowPasswordForm(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setPasswordError("An error occurred. Please try again.");
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <p className="text-red-600 font-bold text-lg">You're not logged in.</p>
            <p className="text-gray-500">Please log in to access your profile.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
            <div className="relative p-8 pb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Your Profile</h2>
                  <p className="text-gray-500 text-sm mt-1">Personal Information</p>
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>

            <div className="px-8 pb-8 space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border hover:shadow-md transition">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">{user.fullName || user.name}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border hover:shadow-md transition">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border hover:shadow-md transition">
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">{user.role}</p>
              </div>

              {showPasswordForm ? (
                <div className="p-4 bg-gray-50 rounded-xl border transition">
                  <form onSubmit={handlePasswordSubmit}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <span className="text-amber-600">🔒</span> Change Password
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-500">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 rounded-lg border"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 rounded-lg border"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 rounded-lg border"
                          required
                        />
                      </div>
                    </div>

                    {passwordError && (
                      <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                    )}
                    {passwordSuccess && (
                      <p className="mt-2 text-sm text-green-600">{passwordSuccess}</p>
                    )}

                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setShowPasswordForm(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="w-full p-4 rounded-xl bg-gray-50 border hover:shadow-md text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <span className="text-amber-600 text-sm">🔑</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Password</p>
                      <p className="text-lg font-semibold text-gray-800">••••••••</p>
                    </div>
                  </div>
                </button>
              )}

              <div className="pt-4">
                <button
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">Manage your account settings and preferences</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
