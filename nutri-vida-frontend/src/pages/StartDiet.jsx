import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Protege la página

const StartDiet = () => {
  useAuth(); // Llama al hook de autenticación para proteger la página

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [skinfold, setSkinfold] = useState("");
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [calculatedData, setCalculatedData] = useState(null);
  const navigate = useNavigate();

  // Función para calcular el Índice de Masa Corporal (IMC)
  const calculateIMC = () => {
    const heightMeters = height / 100; // Convertir altura a metros
    return (weight / (heightMeters * heightMeters)).toFixed(2);
  };

  // Función para calcular la relación cintura-cadera
  const calculateWaistHipRatio = () => {
    return (waist / hip).toFixed(2);
  };

  // Función para calcular la Tasa Metabólica Basal (TMB) y las calorías diarias
  const calculateCalories = () => {
    let TMB = 10 * weight + 6.25 * height - 5 * 25 + 5; // Ejemplo con edad fija de 25 años
    return (TMB * activityLevel).toFixed(2);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imc = calculateIMC();
    const waistHipRatio = calculateWaistHipRatio();
    const dailyCalories = calculateCalories();

    const metricsData = {
      weight_kg: weight,
      height_cm: height,
      imc: imc,
      waist_circumference: waist,
      hip_circumference: hip,
      waist_hip_ratio: waistHipRatio,
      skinfold_thickness: skinfold,
      daily_calories: dailyCalories,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/api/user-metrics", metricsData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCalculatedData(metricsData);
      navigate("/view-metrics"); // Redirigir a la página de ver métricas
    } catch (error) {
      console.error("Error al guardar los datos", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        Calcular y Guardar Métricas de Dieta
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 w-full max-w-lg"
      >
        <label className="block">
          <span className="text-gray-700">Peso (kg):</span>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Altura (cm):</span>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Perímetro de la cintura (cm):</span>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Perímetro de cadera (cm):</span>
          <input
            type="number"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Pliegues cutáneos (mm):</span>
          <input
            type="number"
            value={skinfold}
            onChange={(e) => setSkinfold(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Nivel de actividad:</span>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1.2">Sedentario</option>
            <option value="1.375">Ligeramente activo</option>
            <option value="1.55">Moderadamente activo</option>
            <option value="1.725">Muy activo</option>
            <option value="1.9">Extremadamente activo</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-400 transition duration-200"
        >
          Guardar Métricas
        </button>
      </form>

      {calculatedData && (
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Métricas Calculadas</h2>
          <p className="text-gray-700">IMC: {calculatedData.imc}</p>
          <p className="text-gray-700">
            Relación cintura-cadera: {calculatedData.waist_hip_ratio}
          </p>
          <p className="text-gray-700">
            Calorías diarias: {calculatedData.daily_calories} kcal
          </p>
        </div>
      )}
    </div>
  );
};

export default StartDiet;
