import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Importa el hook de autenticación

const AddDiet = () => {
  useAuth(); // Protege la página

  // Estado para manejar los datos de la dieta
  const [dietData, setDietData] = useState({
    monday_breakfast: "",
    monday_lunch: "",
    monday_dinner: "",
    tuesday_breakfast: "",
    tuesday_lunch: "",
    tuesday_dinner: "",
    wednesday_breakfast: "",
    wednesday_lunch: "",
    wednesday_dinner: "",
    thursday_breakfast: "",
    thursday_lunch: "",
    thursday_dinner: "",
    friday_breakfast: "",
    friday_lunch: "",
    friday_dinner: "",
    saturday_breakfast: "",
    saturday_lunch: "",
    saturday_dinner: "",
    sunday_breakfast: "",
    sunday_lunch: "",
    sunday_dinner: "",
  });
  const navigate = useNavigate();

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    setDietData({
      ...dietData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Obtener el token del localStorage
      if (!token) {
        throw new Error("No token available"); // Verificar si existe el token
      }

      await axios.post("http://localhost:3001/api/diets/create", dietData, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el header
        },
      });

      navigate("/home"); // Redirigir al usuario al home después de agregar la dieta
    } catch (error) {
      console.error("Error al agregar la dieta", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Agregar Dieta</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl space-y-6"
      >
        {/* Lunes */}
        <div>
          <label className="block text-gray-700 font-medium">
            Desayuno Lunes:
          </label>
          <input
            type="text"
            name="monday_breakfast"
            value={dietData.monday_breakfast}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Almuerzo Lunes:
          </label>
          <input
            type="text"
            name="monday_lunch"
            value={dietData.monday_lunch}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Cena Lunes:</label>
          <input
            type="text"
            name="monday_dinner"
            value={dietData.monday_dinner}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Martes */}
        <div>
          <label className="block text-gray-700 font-medium">
            Desayuno Martes:
          </label>
          <input
            type="text"
            name="tuesday_breakfast"
            value={dietData.tuesday_breakfast}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Almuerzo Martes:
          </label>
          <input
            type="text"
            name="tuesday_lunch"
            value={dietData.tuesday_lunch}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Cena Martes:
          </label>
          <input
            type="text"
            name="tuesday_dinner"
            value={dietData.tuesday_dinner}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Repite esto mismo para los días restantes (miércoles, jueves, etc.) */}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-400 transition duration-200"
        >
          Guardar Dieta
        </button>
      </form>
    </div>
  );
};

export default AddDiet;
