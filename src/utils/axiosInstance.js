// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// // Create a separate instance without automatic authentication for public endpoints
// export const axiosPublic = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;




const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
});

export const axiosPublic = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
