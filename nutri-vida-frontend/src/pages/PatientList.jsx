import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Hook para proteger la página

const PatientList = () => {
  useAuth(); // Protege la página

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        setError("Error al obtener la lista de pacientes");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Cargando pacientes...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Lista de Pacientes
        </h1>
        {patients.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-6 py-4 text-left">Nombre</th>
                  <th className="px-6 py-4 text-left">Fecha de Creación</th>
                  <th className="px-6 py-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b">
                    <td className="px-6 py-4 text-gray-700">
                      {patient.first_name} {patient.last_name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(patient.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-4">
                        <Link
                          to={`/patient-diet/${patient.id}`}
                          className="text-blue-500 hover:text-blue-700 font-semibold"
                        >
                          Ver Dieta
                        </Link>
                        <span>|</span>
                        <Link
                          to={`/patient-metrics/${patient.id}`}
                          className="text-green-500 hover:text-green-700 font-semibold"
                        >
                          Ver Métricas
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-6">
            No hay pacientes para mostrar.
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientList;
