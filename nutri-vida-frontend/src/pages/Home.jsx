import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Verificar si el token existe
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Si no hay token, redirige al login
    }
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido a Nutri-Vida</h1>
      <p>Has iniciado sesión exitosamente.</p>

      {/* Botón para Comenzar Dieta */}
      <Link to="/start-diet">
        <button>Calcular Metrica</button>
      </Link>

      {/* Botón para Agregar Dieta */}
      <Link to="/add-diet">
        <button>Agregar Dieta</button>
      </Link>

      {/* Botón para Ver Dietas Guardadas */}
      <Link to="/view-diets">
        <button>Ver Dietas Guardadas</button>
      </Link>

      {/* Botón para Ver Metricas */}
      <Link to="/view-metrics">
        <button>Ver Metricas Guardadas</button>
      </Link>

      {/* Botón para agregar paciente */}
      <Link to="/add-patient">
        <button>Agregar Paciente</button>
      </Link>

      {/* Botón para ver paciente */}
      <Link to="/patients">
        <button>Ver pacientes</button>
      </Link>
    </div>
  );
};

export default Home;
