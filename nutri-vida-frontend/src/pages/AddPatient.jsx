import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Hook para proteger la página

const AddPatient = () => {
  useAuth(); // Protege la página

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Dieta
  const [monday_breakfast, setMondayBreakfast] = useState("");
  const [monday_lunch, setMondayLunch] = useState("");
  const [monday_dinner, setMondayDinner] = useState("");
  const [tuesday_breakfast, setTuesdayBreakfast] = useState("");
  const [tuesday_lunch, setTuesdayLunch] = useState("");
  const [tuesday_dinner, setTuesdayDinner] = useState("");

  // Métricas del paciente
  const [weight_kg, setWeightKg] = useState("");
  const [height_cm, setHeightCm] = useState("");
  const [waist_circumference, setWaistCircumference] = useState("");
  const [hip_circumference, setHipCircumference] = useState("");
  const [skinfold_thickness, setSkinfoldThickness] = useState("");
  const [activityLevel, setActivityLevel] = useState(1.2); // Nivel de actividad
  const [calculatedCalories, setCalculatedCalories] = useState("");
  const [calculatedIMC, setCalculatedIMC] = useState("");

  const navigate = useNavigate();

  // Función para calcular el Índice de Masa Corporal (IMC)
  const calculateIMC = () => {
    const heightMeters = height_cm / 100; // Convertir altura a metros
    const imc = (weight_kg / (heightMeters * heightMeters)).toFixed(2);
    setCalculatedIMC(imc);
    return imc;
  };

  // Función para calcular la Tasa Metabólica Basal (TMB) y las calorías diarias
  const calculateCalories = () => {
    const TMB = 10 * weight_kg + 6.25 * height_cm - 5 * 25 + 5; // Fórmula para un hombre de 25 años
    const dailyCalories = (TMB * activityLevel).toFixed(2);
    setCalculatedCalories(dailyCalories);
    return dailyCalories;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calcular automáticamente el IMC y las calorías diarias antes de enviar
    const imc = calculateIMC();
    const dailyCalories = calculateCalories();

    const patientData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      diet: {
        monday_breakfast,
        monday_lunch,
        monday_dinner,
        tuesday_breakfast,
        tuesday_lunch,
        tuesday_dinner,
      },
      metrics: {
        weight_kg,
        height_cm,
        waist_circumference,
        hip_circumference,
        skinfold_thickness,
        imc, // Enviar el IMC calculado
        daily_calories: dailyCalories, // Enviar las calorías calculadas
      },
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Enviar los datos y recibir el PDF como respuesta (blob)
      const response = await axios.post(
        "http://localhost:3001/api/patients/create",
        patientData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los headers
          },
          responseType: "blob", // Necesario para manejar la respuesta como archivo
        }
      );

      // Crear un enlace temporal para descargar el PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${firstName}_${lastName}_info.pdf`); // Nombre del archivo
      document.body.appendChild(link);
      link.click();

      // Redirigir a la página de pacientes después de agregar
      navigate("/patients");
    } catch (error) {
      console.error("Error al agregar el paciente o descargar el PDF", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Agregar Paciente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Apellido:</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-gray-700">Correo Electrónico:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Número de Teléfono:</span>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>

        {/* Dieta */}
        <h2 className="text-2xl font-bold mt-6">Dieta</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-gray-700">Lunes Desayuno:</span>
            <input
              type="text"
              value={monday_breakfast}
              onChange={(e) => setMondayBreakfast(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Lunes Almuerzo:</span>
            <input
              type="text"
              value={monday_lunch}
              onChange={(e) => setMondayLunch(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Lunes Cena:</span>
            <input
              type="text"
              value={monday_dinner}
              onChange={(e) => setMondayDinner(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>

          {/* Martes */}
          <label className="block">
            <span className="text-gray-700">Martes Desayuno:</span>
            <input
              type="text"
              value={tuesday_breakfast}
              onChange={(e) => setTuesdayBreakfast(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Martes Almuerzo:</span>
            <input
              type="text"
              value={tuesday_lunch}
              onChange={(e) => setTuesdayLunch(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Martes Cena:</span>
            <input
              type="text"
              value={tuesday_dinner}
              onChange={(e) => setTuesdayDinner(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>

        {/* Métricas del paciente */}
        <h2 className="text-2xl font-bold mt-6">Métricas del Paciente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700">Peso (kg):</span>
            <input
              type="number"
              value={weight_kg}
              onChange={(e) => setWeightKg(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Altura (cm):</span>
            <input
              type="number"
              value={height_cm}
              onChange={(e) => setHeightCm(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700">Perímetro de la cintura (cm):</span>
            <input
              type="number"
              value={waist_circumference}
              onChange={(e) => setWaistCircumference(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Perímetro de la cadera (cm):</span>
            <input
              type="number"
              value={hip_circumference}
              onChange={(e) => setHipCircumference(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-gray-700">Pliegues cutáneos (mm):</span>
          <input
            type="number"
            value={skinfold_thickness}
            onChange={(e) => setSkinfoldThickness(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Nivel de actividad:</span>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="1.2">Sedentario</option>
            <option value="1.375">Ligeramente activo</option>
            <option value="1.55">Moderadamente activo</option>
            <option value="1.725">Muy activo</option>
            <option value="1.9">Extremadamente activo</option>
          </select>
        </label>

        {/* Muestra de IMC y calorías calculadas */}
        <div className="mt-4">
          <h3 className="text-lg font-bold">IMC Calculado: {calculatedIMC}</h3>
          <h3 className="text-lg font-bold">
            Calorías Diarias Calculadas: {calculatedCalories} kcal
          </h3>
        </div>

        {/* Botón para guardar */}
        <button
          type="submit"
          className="w-full py-2 mt-6 bg-blue-500 text-white font-bold rounded hover:bg-blue-400"
        >
          Guardar Paciente
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
