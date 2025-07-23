


import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user, logout, login } = useAuth(); // ✅ added login for refresh fix
  const navigate = useNavigate();

  const [showPasswordFields, setShowPasswordFields] = useState(false);
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
      login(updatedUser); // ✅ This updates both state and localStorage
      toast.success("Password updated successfully!");
      setShowPasswordFields(false); // ✅ hide form again
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error("Failed to update password");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100 flex items-center justify-center p-6">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-stone-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-neutral-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-stone-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl shadow-stone-200/50 rounded-3xl p-10 w-full max-w-md border border-stone-200/50 hover:shadow-3xl hover:shadow-stone-300/30 transition-all duration-700 ease-out hover:scale-[1.02] hover:bg-white/90">
        
        {/* Minimalist header with subtle line accent */}
        <div className="text-center mb-8">
          <div className="w-12 h-0.5 bg-gradient-to-r from-stone-400 to-stone-300 mx-auto mb-4 rounded-full"></div>
          <h2 className="text-3xl font-light text-stone-800 tracking-wide mb-2">Your Profile</h2>
          <p className="text-stone-500 text-sm font-light">Manage your account settings</p>
        </div>

        {/* Profile info card */}
        <div className="bg-gradient-to-r from-stone-50 to-neutral-50 rounded-2xl p-6 mb-8 border border-stone-100 hover:border-stone-200 transition-all duration-500 hover:shadow-lg hover:shadow-stone-200/30">
          <div className="space-y-4">
            <div className="group">
              <label className="block text-stone-500 text-xs uppercase tracking-wider font-medium mb-1">Name</label>
              <p className="text-stone-800 text-lg font-light group-hover:text-stone-900 transition-colors duration-300">{user.name}</p>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
            <div className="group">
              <label className="block text-stone-500 text-xs uppercase tracking-wider font-medium mb-1">Email</label>
              <p className="text-stone-800 text-lg font-light group-hover:text-stone-900 transition-colors duration-300">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Change Password Button */}
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

        {/* Password form with smooth slide animation */}
        <div className={`overflow-hidden transition-all duration-700 ease-out ${showPasswordFields ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
          <form onSubmit={handlePasswordSubmit} className="space-y-5 pt-2">
            <div className="group">
              <label className="block text-stone-600 text-sm font-light mb-2 group-hover:text-stone-800 transition-colors duration-300">Current Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  required
                  className="w-full border border-stone-200 bg-white/50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-stone-400 transition-all duration-300 hover:border-stone-300 hover:bg-white/70 backdrop-blur-sm text-stone-800 placeholder-stone-400"
                  placeholder="Enter current password"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-stone-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="group">
              <label className="block text-stone-600 text-sm font-light mb-2 group-hover:text-stone-800 transition-colors duration-300">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  required
                  className="w-full border border-stone-200 bg-white/50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-stone-400 transition-all duration-300 hover:border-stone-300 hover:bg-white/70 backdrop-blur-sm text-stone-800 placeholder-stone-400"
                  placeholder="Enter new password"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-stone-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
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

        {/* Logout Button */}
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

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-8">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
    </>
  );
};


export default Profile;