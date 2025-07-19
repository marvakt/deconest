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

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedAdminRoute;


