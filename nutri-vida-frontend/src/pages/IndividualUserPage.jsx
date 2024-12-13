import React from "react";
import useAuth from "../hooks/useAuth"; // Importa el hook personalizado
import { useNavigate } from "react-router-dom";

const IndividualUserPage = () => {
  useAuth(); // Protege la página

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {/* Mensaje de bienvenida */}
      <h1 className="text-4xl font-extrabold mb-8 text-white shadow-lg">
        Bienvenido Usuario Individual
      </h1>

      {/* Contenedor de botones */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <button
          onClick={() => navigate("/start-diet")}
          className="w-64 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-blue-500 hover:scale-105"
        >
          Crear Métrica
        </button>

        <button
          onClick={() => navigate("/add-diet")}
          className="w-64 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-green-500 hover:scale-105"
        >
          Crear Dieta
        </button>

        <button
          onClick={() => navigate("/view-diets")}
          className="w-64 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-red-500 hover:scale-105"
        >
          Ver Dieta
        </button>

        <button
          onClick={() => navigate("/view-metrics")}
          className="w-64 py-4 bg-yellow-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-yellow-500 hover:scale-105"
        >
          Ver Métrica
        </button>
      </div>
    </div>
  );
};

export default IndividualUserPage;
