import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Hook para proteger la página

const ViewMetrics = () => {
  useAuth(); // Proteger la página

  const [metrics, setMetrics] = useState([]);
  const navigate = useNavigate();

  // Cargar las métricas del usuario al montar el componente
  useEffect(() => {
    const fetchMetrics = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user-metrics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMetrics(response.data);
      } catch (error) {
        console.error("Error al cargar las métricas", error);
      }
    };

    fetchMetrics();
  }, []);

  // Función para eliminar una métrica
  const deleteMetric = async (metricId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3001/api/user-metrics/${metricId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMetrics(metrics.filter((metric) => metric.id !== metricId)); // Eliminar localmente
    } catch (error) {
      console.error("Error al eliminar la métrica", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Tus Métricas Guardadas
      </h1>
      {metrics.length === 0 ? (
        <p className="text-center text-gray-500">
          No tienes métricas guardadas.
        </p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                Peso (kg)
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                Altura (cm)
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                IMC
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                Cintura (cm)
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                Cadera (cm)
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                Relación cintura-cadera
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                Pliegues cutáneos (mm)
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                Calorías diarias
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.id}>
                <td className="py-2 px-4 border-b">{metric.weight_kg}</td>
                <td className="py-2 px-4 border-b">{metric.height_cm}</td>
                <td className="py-2 px-4 border-b">{metric.imc}</td>
                <td className="py-2 px-4 border-b">
                  {metric.waist_circumference}
                </td>
                <td className="py-2 px-4 border-b">
                  {metric.hip_circumference}
                </td>
                <td className="py-2 px-4 border-b">{metric.waist_hip_ratio}</td>
                <td className="py-2 px-4 border-b">
                  {metric.skinfold_thickness}
                </td>
                <td className="py-2 px-4 border-b">{metric.daily_calories}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => deleteMetric(metric.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition duration-200"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewMetrics;
