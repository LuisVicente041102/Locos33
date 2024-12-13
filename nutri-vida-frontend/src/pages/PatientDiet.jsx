import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Hook para proteger la página

const PatientDiet = () => {
  useAuth(); // Protege la página

  const { id } = useParams(); // Obtiene el ID del paciente desde la URL
  const [diet, setDiet] = useState(null);

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/patients/${id}/diet`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar el token en los headers
            },
          }
        );
        setDiet(response.data); // Guardar la dieta en el estado
      } catch (error) {
        console.error("Error al obtener la dieta del paciente", error); // Manejar el error
      }
    };

    fetchDiet();
  }, [id]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Dieta del Paciente
      </h1>
      {diet ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-700">Comida</th>
              <th className="px-4 py-2 text-left text-gray-700">Lunes</th>
              <th className="px-4 py-2 text-left text-gray-700">Martes</th>
              <th className="px-4 py-2 text-left text-gray-700">Miércoles</th>
              <th className="px-4 py-2 text-left text-gray-700">Jueves</th>
              <th className="px-4 py-2 text-left text-gray-700">Viernes</th>
              <th className="px-4 py-2 text-left text-gray-700">Sábado</th>
              <th className="px-4 py-2 text-left text-gray-700">Domingo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Desayuno</td>
              <td className="px-4 py-2">{diet.monday_breakfast || "-"}</td>
              <td className="px-4 py-2">{diet.tuesday_breakfast || "-"}</td>
              <td className="px-4 py-2">{diet.wednesday_breakfast || "-"}</td>
              <td className="px-4 py-2">{diet.thursday_breakfast || "-"}</td>
              <td className="px-4 py-2">{diet.friday_breakfast || "-"}</td>
              <td className="px-4 py-2">{diet.saturday_breakfast || "-"}</td>
              <td className="px-4 py-2">{diet.sunday_breakfast || "-"}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Almuerzo</td>
              <td className="px-4 py-2">{diet.monday_lunch || "-"}</td>
              <td className="px-4 py-2">{diet.tuesday_lunch || "-"}</td>
              <td className="px-4 py-2">{diet.wednesday_lunch || "-"}</td>
              <td className="px-4 py-2">{diet.thursday_lunch || "-"}</td>
              <td className="px-4 py-2">{diet.friday_lunch || "-"}</td>
              <td className="px-4 py-2">{diet.saturday_lunch || "-"}</td>
              <td className="px-4 py-2">{diet.sunday_lunch || "-"}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Cena</td>
              <td className="px-4 py-2">{diet.monday_dinner || "-"}</td>
              <td className="px-4 py-2">{diet.tuesday_dinner || "-"}</td>
              <td className="px-4 py-2">{diet.wednesday_dinner || "-"}</td>
              <td className="px-4 py-2">{diet.thursday_dinner || "-"}</td>
              <td className="px-4 py-2">{diet.friday_dinner || "-"}</td>
              <td className="px-4 py-2">{diet.saturday_dinner || "-"}</td>
              <td className="px-4 py-2">{diet.sunday_dinner || "-"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center text-lg">Cargando dieta...</p>
      )}
    </div>
  );
};

export default PatientDiet;
