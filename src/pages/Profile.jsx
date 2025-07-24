



// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast"; 
// import Navbar from "../components/Navbar";

// const Profile = () => {
//   const { user, logout, login } = useAuth(); 
//   const navigate = useNavigate();

//   const [showPasswordFields, setShowPasswordFields] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//   });

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully!");
//     navigate("/login");
//   };

//   const handlePasswordChangeClick = () => {
//     setShowPasswordFields((prev) => !prev);
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();

//     if (passwordData.currentPassword !== user.password) {
//       toast.error("Current password is incorrect");
//       return;
//     }

//     try {
//       await axios.patch(`http://localhost:3000/users/${user.id}`, {
//         password: passwordData.newPassword,
//       });

//       const updatedUser = { ...user, password: passwordData.newPassword };
//       login(updatedUser); 
//       toast.success("Password updated successfully!");
//       setShowPasswordFields(false); 
//       setPasswordData({ currentPassword: "", newPassword: "" });
//     } catch (error) {
//       console.error("Password update failed:", error);
//       toast.error("Failed to update password");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100 flex items-center justify-center p-6">
       
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-20 w-32 h-32 bg-stone-200/30 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-32 right-32 w-48 h-48 bg-neutral-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-stone-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
//         </div>

//         <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl shadow-stone-200/50 rounded-3xl p-10 w-full max-w-md border border-stone-200/50 hover:shadow-3xl hover:shadow-stone-300/30 transition-all duration-700 ease-out hover:scale-[1.02] hover:bg-white/90">
       
//           <div className="text-center mb-8">
//             <div className="w-12 h-0.5 bg-gradient-to-r from-stone-400 to-stone-300 mx-auto mb-4 rounded-full"></div>
//             <h2 className="text-3xl font-light text-stone-800 tracking-wide mb-2">Your Profile</h2>
//             <p className="text-stone-500 text-sm font-light">Manage your account settings</p>
//           </div>

//           <div className="bg-gradient-to-r from-stone-50 to-neutral-50 rounded-2xl p-6 mb-8 border border-stone-100 hover:border-stone-200 transition-all duration-500 hover:shadow-lg hover:shadow-stone-200/30">
//             <div className="space-y-4">
//               <div className="group">
//                 <label className="block text-stone-500 text-xs uppercase tracking-wider font-medium mb-1">Name</label>
//                 <p className="text-stone-800 text-lg font-light group-hover:text-stone-900 transition-colors duration-300">{user.name}</p>
//               </div>
//               <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
//               <div className="group">
//                 <label className="block text-stone-500 text-xs uppercase tracking-wider font-medium mb-1">Email</label>
//                 <p className="text-stone-800 text-lg font-light group-hover:text-stone-900 transition-colors duration-300">{user.email}</p>
//               </div>
//             </div>
//           </div>

         
//           <button
//             onClick={handlePasswordChangeClick}
//             className="group w-full bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-900 hover:to-stone-800 text-white font-light py-3.5 px-6 rounded-2xl mb-6 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-stone-400/30 transform hover:-translate-y-0.5 relative overflow-hidden"
//           >
//             <span className="relative z-10 flex items-center justify-center space-x-2">
//               <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//               <span>{showPasswordFields ? "Cancel" : "Change Password"}</span>
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           </button>

        
//           <div className={`overflow-hidden transition-all duration-700 ease-out ${showPasswordFields ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
//             <form onSubmit={handlePasswordSubmit} className="space-y-5 pt-2">
//               <div className="group">
//                 <label className="block text-stone-600 text-sm font-light mb-2 group-hover:text-stone-800 transition-colors duration-300">Current Password</label>
//                 <input
//                   type="password"
//                   value={passwordData.currentPassword}
//                   onChange={(e) =>
//                     setPasswordData({ ...passwordData, currentPassword: e.target.value })
//                   }
//                   required
//                   className="w-full border border-stone-200 bg-white/50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-stone-400 transition-all duration-300 hover:border-stone-300 hover:bg-white/70 backdrop-blur-sm text-stone-800 placeholder-stone-400"
//                   placeholder="Enter current password"
//                 />
//               </div>

//               <div className="group">
//                 <label className="block text-stone-600 text-sm font-light mb-2 group-hover:text-stone-800 transition-colors duration-300">New Password</label>
//                 <input
//                   type="password"
//                   value={passwordData.newPassword}
//                   onChange={(e) =>
//                     setPasswordData({ ...passwordData, newPassword: e.target.value })
//                   }
//                   required
//                   className="w-full border border-stone-200 bg-white/50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-stone-400 transition-all duration-300 hover:border-stone-300 hover:bg-white/70 backdrop-blur-sm text-stone-800 placeholder-stone-400"
//                   placeholder="Enter new password"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="group w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-light py-3.5 px-6 rounded-2xl transition-all duration-500 ease-out hover:shadow-xl hover:shadow-emerald-400/30 transform hover:-translate-y-0.5 relative overflow-hidden"
//               >
//                 <span className="relative z-10 flex items-center justify-center space-x-2">
//                   <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>Save New Password</span>
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               </button>
//             </form>
//           </div>

          
//           <button
//             onClick={handleLogout}
//             className="group w-full bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-light py-3.5 px-6 rounded-2xl transition-all duration-500 ease-out hover:shadow-xl hover:shadow-red-400/30 transform hover:-translate-y-0.5 relative overflow-hidden"
//           >
//             <span className="relative z-10 flex items-center justify-center space-x-2">
//               <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               <span>Logout</span>
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           </button>

          
//           <div className="flex justify-center mt-8">
//             <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent rounded-full"></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;



import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handlePasswordChangeClick = () => {
    setShowPasswordFields((prev) => !prev);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.currentPassword !== user.password) {
      toast.error("Current password is incorrect");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        password: passwordData.newPassword,
      });

      const updatedUser = { ...user, password: passwordData.newPassword };
      login(updatedUser);
      toast.success("Password updated successfully!");
      setShowPasswordFields(false);
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error("Failed to update password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100 flex items-center justify-center p-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-stone-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-neutral-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-stone-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl shadow-stone-200/50 rounded-3xl p-10 w-full max-w-md border border-stone-200/50 hover:shadow-3xl hover:shadow-stone-300/30 transition-all duration-700 ease-out hover:scale-[1.02] hover:bg-white/90">
          <div className="text-center mb-8">
            <div className="w-12 h-0.5 bg-gradient-to-r from-stone-400 to-stone-300 mx-auto mb-4 rounded-full"></div>
            <h2 className="text-3xl font-light text-stone-800 tracking-wide mb-2">Your Profile</h2>
            <p className="text-stone-500 text-sm font-light">Manage your account settings</p>
          </div>

          <div className="bg-gradient-to-r from-stone-50 to-neutral-50 rounded-2xl p-6 mb-8 border border-stone-100 hover:border-stone-200 transition-all duration-500 hover:shadow-lg hover:shadow-stone-200/30">
            <div className="space-y-4">
              <div className="group">
                <label className="block text-stone-500 text-xs uppercase tracking-wider font-medium mb-1">Name</label>
                <p className="text-stone-800 text-lg font-light group-hover:text-stone-900 transition-colors duration-300">{user.fullName}</p>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
              <div className="group">
                <label className="block text-stone-500 text-xs uppercase tracking-wider font-medium mb-1">Email</label>
                <p className="text-stone-800 text-lg font-light group-hover:text-stone-900 transition-colors duration-300">{user.email}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePasswordChangeClick}
            className="group w-full bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-900 hover:to-stone-800 text-white font-light py-3.5 px-6 rounded-2xl mb-6 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-stone-400/30 transform hover:-translate-y-0.5 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{showPasswordFields ? "Cancel" : "Change Password"}</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>

          <div className={`overflow-hidden transition-all duration-700 ease-out ${showPasswordFields ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
            <form onSubmit={handlePasswordSubmit} className="space-y-5 pt-2">
              
              <div className="group relative">
                <label className="block text-stone-600 text-sm font-light mb-2">Current Password</label>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                  className="w-full border border-stone-200 bg-white/50 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-stone-400 transition-all duration-300 hover:border-stone-300 hover:bg-white/70 backdrop-blur-sm text-stone-800 placeholder-stone-400"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute top-10 right-4 text-stone-500 hover:text-stone-700"
                >
                  {showCurrentPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.525-5.275m4.65-1.6A9.968 9.968 0 0112 3c5.523 0 10 4.477 10 10 0 2.01-.59 3.882-1.6 5.45M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.269 2.943 9.543 7-1.274 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              
              <div className="group relative">
                <label className="block text-stone-600 text-sm font-light mb-2">New Password</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                  className="w-full border border-stone-200 bg-white/50 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-stone-400 transition-all duration-300 hover:border-stone-300 hover:bg-white/70 backdrop-blur-sm text-stone-800 placeholder-stone-400"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute top-10 right-4 text-stone-500 hover:text-stone-700"
                >
                  {showNewPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.525-5.275m4.65-1.6A9.968 9.968 0 0112 3c5.523 0 10 4.477 10 10 0 2.01-.59 3.882-1.6 5.45M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.269 2.943 9.543 7-1.274 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-light py-3.5 px-6 rounded-2xl transition-all duration-500 ease-out hover:shadow-xl hover:shadow-emerald-400/30 transform hover:-translate-y-0.5 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save New Password</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </form>
          </div>

          <button
            onClick={handleLogout}
            className="group w-full bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-light py-3.5 px-6 rounded-2xl transition-all duration-500 ease-out hover:shadow-xl hover:shadow-red-400/30 transform hover:-translate-y-0.5 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>

          <div className="flex justify-center mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
