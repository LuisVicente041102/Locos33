import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para la autenticación
  const [authToken, setAuthToken] = useState(null); // Estado para almacenar el token
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar el token del localStorage
    const token = localStorage.getItem("token");
    console.log("Token encontrado en localStorage:", token); // Verificar si el token está en el localStorage

    if (!token) {
      navigate("/login"); // Redirige al login si no hay token
    } else {
      setIsAuthenticated(true); // Usuario autenticado
      setAuthToken(token); // Almacena el token en el estado
      console.log("Token almacenado en el estado:", token); // Verificar que el token se almacena en el estado
    }
  }, [navigate]);

  return { isAuthenticated, authToken }; // Retorna el estado de autenticación y el token
};

export default useAuth;
