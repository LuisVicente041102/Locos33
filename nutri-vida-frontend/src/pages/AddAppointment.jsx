import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth"; // Asegúrate de importar el hook

const AddAppointment = () => {
  const [patientId, setPatientId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { authToken, isAuthenticated } = useAuth(); // Obtener el token y el estado de autenticación

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      console.error("Usuario no autenticado");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/appointments",
        {
          patient_id: patientId,
          appointment_date: appointmentDate,
          appointment_reason: appointmentReason,
          phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Enviar el token en el encabezado
          },
        }
      );
      alert("Cita agregada correctamente");
    } catch (error) {
      console.error("Error al agregar la cita:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 p-8">
      <h2 className="text-4xl font-extrabold text-white mb-8">Agregar Cita</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* Input Patient ID */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            ID del Paciente:
          </label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Input Appointment Date */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            Fecha de la Cita:
          </label>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Input Appointment Reason */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            Razón de la Cita:
          </label>
          <input
            type="text"
            value={appointmentReason}
            onChange={(e) => setAppointmentReason(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Input Phone Number */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            Número de Teléfono:
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Agregar Cita
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
