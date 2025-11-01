



// // src/utils/axiosInstance.js
// import axios from "axios";

// // ✅ Use your deployed backend URL (Django running on EC2)
// const BASE_URL = import.meta.env.VITE_API_URL || "http://65.2.57.57/api/";

// // 🔹 Create axios instance
// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔹 Automatically attach JWT token (if available)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔹 Export both default & named version
// export default axiosInstance;
// export const axiosPublic = axiosInstance;



// src/utils/axiosInstance.js
import axios from "axios";

// ✅ Always use HTTPS — your backend is SSL enabled now
const BASE_URL = import.meta.env.VITE_API_URL || "https://65.2.57.57/api/";

// 🔹 Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Automatically attach JWT token (if available)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
export const axiosPublic = axiosInstance;
