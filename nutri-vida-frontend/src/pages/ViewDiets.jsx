import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ViewDiets = () => {
  useAuth(); // Proteger la página

  const [diets, setDiets] = useState([]);
  const navigate = useNavigate();

  // Cargar las dietas del usuario cuando la página se monta
  useEffect(() => {
    const fetchDiets = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3001/api/diets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDiets(response.data);
      } catch (error) {
        console.error("Error al cargar las dietas", error);
      }
    };

    fetchDiets();
  }, []);

  // Función para eliminar una dieta
  const deleteDiet = async (dietId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3001/api/diets/${dietId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Eliminar la dieta de la lista localmente
      setDiets(diets.filter((diet) => diet.id !== dietId));
    } catch (error) {
      console.error("Error al eliminar la dieta", error);
    }
  };

  // Función para modificar una dieta (redireccionar a la página de edición)
  const modifyDiet = (dietId) => {
    navigate(`/edit-diet/${dietId}`); // Redirigir a la página de edición
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Tus Dietas Guardadas
      </h1>
      {diets.length === 0 ? (
        <p className="text-center text-gray-500">No tienes dietas guardadas.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Día</th>
              <th className="py-3 px-6 text-left">Desayuno</th>
              <th className="py-3 px-6 text-left">Almuerzo</th>
              <th className="py-3 px-6 text-left">Cena</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {diets.map((diet) => (
              <React.Fragment key={diet.id}>
                {/* Lunes */}
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Lunes
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.monday_breakfast}
                  </td>
                  <td className="py-3 px-6 text-left">{diet.monday_lunch}</td>
                  <td className="py-3 px-6 text-left">{diet.monday_dinner}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => modifyDiet(diet.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 mr-2"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={() => deleteDiet(diet.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
                {/* Martes */}
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Martes
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.tuesday_breakfast}
                  </td>
                  <td className="py-3 px-6 text-left">{diet.tuesday_lunch}</td>
                  <td className="py-3 px-6 text-left">{diet.tuesday_dinner}</td>
                </tr>
                {/* Miércoles */}
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Miércoles
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.wednesday_breakfast}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.wednesday_lunch}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.wednesday_dinner}
                  </td>
                </tr>
                {/* Jueves */}
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Jueves
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.thursday_breakfast}
                  </td>
                  <td className="py-3 px-6 text-left">{diet.thursday_lunch}</td>
                  <td className="py-3 px-6 text-left">
                    {diet.thursday_dinner}
                  </td>
                </tr>
                {/* Viernes */}
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Viernes
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.friday_breakfast}
                  </td>
                  <td className="py-3 px-6 text-left">{diet.friday_lunch}</td>
                  <td className="py-3 px-6 text-left">{diet.friday_dinner}</td>
                </tr>
                {/* Sábado */}
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Sábado
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.saturday_breakfast}
                  </td>
                  <td className="py-3 px-6 text-left">{diet.saturday_lunch}</td>
                  <td className="py-3 px-6 text-left">
                    {diet.saturday_dinner}
                  </td>
                </tr>
                {/* Domingo */}
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Domingo
                  </td>
                  <td className="py-3 px-6 text-left">
                    {diet.sunday_breakfast}
                  </td>
                  <td className="py-3 px-6 text-left">{diet.sunday_lunch}</td>
                  <td className="py-3 px-6 text-left">{diet.sunday_dinner}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewDiets;
