import axios from "axios";

// Determina la URL base automáticamente
const getBaseURL = () => {
  if (window.location.hostname === "localhost") {
    // Entorno local
    return "http://localhost:3001/api";
  } else {
    // Cualquier otra URL (como un túnel o dominio en producción)
    return `${window.location.origin}/api`;
  }
};

// Configura la URL base para axios
axios.defaults.baseURL = getBaseURL();

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
