// utils/auth.js
export const saveSession = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getSession = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const clearSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  localStorage.removeItem("wishlist");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

export const isAdmin = () => {
  const user = getSession();
  return user?.role === "admin";
};
