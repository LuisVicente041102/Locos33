import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDiet = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchDiet = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:3001/api/diets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDietData(response.data);
      } catch (error) {
        console.error("Error al cargar la dieta", error);
      }
    };

    fetchDiet();
  }, [id]);

  const handleChange = (e) => {
    setDietData({
      ...dietData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3001/api/diets/${id}`, dietData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/view-diets");
    } catch (error) {
      console.error("Error al modificar la dieta", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Modificar Dieta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Día Lunes */}
          <div>
            <label className="block font-medium text-gray-700">
              Desayuno Lunes:
            </label>
            <input
              type="text"
              name="monday_breakfast"
              value={dietData.monday_breakfast}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Almuerzo Lunes:
            </label>
            <input
              type="text"
              name="monday_lunch"
              value={dietData.monday_lunch}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Cena Lunes:
            </label>
            <input
              type="text"
              name="monday_dinner"
              value={dietData.monday_dinner}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Repetir estructura para otros días */}
          {/* Martes */}
          <div>
            <label className="block font-medium text-gray-700">
              Desayuno Martes:
            </label>
            <input
              type="text"
              name="tuesday_breakfast"
              value={dietData.tuesday_breakfast}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Almuerzo Martes:
            </label>
            <input
              type="text"
              name="tuesday_lunch"
              value={dietData.tuesday_lunch}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Cena Martes:
            </label>
            <input
              type="text"
              name="tuesday_dinner"
              value={dietData.tuesday_dinner}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Continua con Miércoles a Domingo */}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditDiet;
