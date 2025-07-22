// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedAdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));
//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export default ProtectedAdminRoute;



// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedAdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));
//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export default ProtectedAdminRoute;



// ✅ src/components/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Use context instead of localStorage

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();

  // ⏳ Wait for localStorage to load into context
  if (user === null) return null;

  // ❌ If not admin, redirect to login
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;


