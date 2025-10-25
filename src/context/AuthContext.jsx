


// import React, { createContext, useContext, useState, useEffect } from "react";

// export const authContext = createContext()


// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("loggedInUser");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const login = (userData, tokens) => {
//     setUser(userData);
//     localStorage.setItem("loggedInUser", JSON.stringify(userData));
//     if (tokens) {
//       localStorage.setItem("access_token", tokens.access);
//       localStorage.setItem("refresh_token", tokens.refresh);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//   };

//   return <authContext.Provider value={{ user, login, logout }}>
//     {children}
//   </authContext.Provider>;

// };

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser && !user) setUser(JSON.parse(storedUser));
  }, [user]);

  const login = (userData, tokens) => {
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    if (tokens) {
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"; // optional: redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
