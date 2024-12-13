import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Hook para proteger la página

const PatientMetrics = () => {
  useAuth(); // Protege la página

  const { id } = useParams(); // Obtener el ID del paciente desde la URL
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/patients/${id}/metrics`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar el token en los headers
            },
          }
        );
        setMetrics(response.data); // Guardar las métricas en el estado
      } catch (error) {
        console.error("Error al obtener las métricas del paciente", error); // Manejar el error
      }
    };

    fetchMetrics();
  }, [id]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Métricas del Paciente
      </h1>
      {metrics ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-700">Métrica</th>
              <th className="px-4 py-2 text-left text-gray-700">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Peso (kg)</td>
              <td className="px-4 py-2">{metrics.weight_kg || "-"}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Altura (cm)</td>
              <td className="px-4 py-2">{metrics.height_cm || "-"}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">IMC</td>
              <td className="px-4 py-2">{metrics.imc || "-"}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Perímetro de cintura (cm)</td>
              <td className="px-4 py-2">
                {metrics.waist_circumference || "-"}
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Perímetro de cadera (cm)</td>
              <td className="px-4 py-2">{metrics.hip_circumference || "-"}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Relación cintura-cadera</td>
              <td className="px-4 py-2">{metrics.waist_hip_ratio || "-"}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Pliegues cutáneos (mm)</td>
              <td className="px-4 py-2">{metrics.skinfold_thickness || "-"}</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Calorías diarias</td>
              <td className="px-4 py-2">{metrics.daily_calories || "-"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center text-lg">Cargando métricas...</p>
      )}
    </div>
  );
};

export default PatientMetrics;
