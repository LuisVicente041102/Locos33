// src/config/axiosConfig.js
import axios from "axios";

// Configura la URL base de axios
axios.defaults.baseURL = "http://localhost:3001/api";

// Interceptor para incluir el token en cada solicitud
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
