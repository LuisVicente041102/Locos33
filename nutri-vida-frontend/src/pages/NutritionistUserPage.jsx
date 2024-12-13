import React from "react";
import useAuth from "../hooks/useAuth"; // Importa el hook personalizado
import { useNavigate } from "react-router-dom";

const NutritionistUserPage = () => {
  const { isAuthenticated } = useAuth(); // Protege la página y obtiene el estado de autenticación

  const navigate = useNavigate();

  if (!isAuthenticated) {
    return null; // Opcional: Muestra un loader o null mientras se verifica el token
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      {/* Mensaje de bienvenida */}
      <h1 className="text-4xl font-extrabold mb-8 text-white shadow-lg">
        Bienvenido Usuario Nutricionista
      </h1>

      {/* Contenedor de botones */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <button
          onClick={() => navigate("/add-patient")}
          className="w-64 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-blue-500 hover:scale-105"
        >
          Agregar Paciente
        </button>

        <button
          onClick={() => navigate("/patients-l")}
          className="w-64 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-green-500 hover:scale-105"
        >
          Ver Pacientes
        </button>

        <button
          onClick={() => navigate("/appointments-calendar")}
          className="w-64 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-purple-500 hover:scale-105"
        >
          Ver Calendario de Citas
        </button>

        <button
          onClick={() => navigate("/addappointment")}
          className="w-64 py-4 bg-yellow-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-yellow-500 hover:scale-105"
        >
          Agregar Cita
        </button>
      </div>
    </div>
  );
};

export default NutritionistUserPage;
