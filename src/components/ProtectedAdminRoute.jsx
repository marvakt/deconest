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





import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === null) return null;

 
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;