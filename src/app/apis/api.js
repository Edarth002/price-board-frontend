import axios from "axios";

// Create Axios instance with base URL from environment variables
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

// Interceptor to add Authorization token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
