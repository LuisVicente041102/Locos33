import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import startImage from "../assets/start1.png"; // Importa la imagen
import startImage1 from "../assets/start2.png"; // Importa la imagen
import useAuth from "../hooks/useAuth"; // Importa el hook personalizado

const Home = () => {
  const navigate = useNavigate();

  // Verificar si el token existe
  useAuth(); // Llama al hook de autenticación

  return (
    <div className="flex h-screen">
      {/* Sección para Individualmente */}
      <div
        className="w-1/2 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${startImage})`, // Aquí se usa la imagen importada
        }}
      >
        <button
          onClick={() => navigate("/individualuserpage")}
          className="px-8 py-4 bg-blue-500 text-white text-2xl font-bold rounded hover:bg-blue-400"
        >
          Individualmente
        </button>
      </div>

      {/* Sección para Nutricionista */}
      <div
        className="w-1/2 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${startImage1})`, // También aquí
        }}
      >
        <button
          onClick={() => navigate("/nutritionistuserpage")}
          className="px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded hover:bg-green-400"
        >
          Nutricionista
        </button>
      </div>
    </div>
  );
};

export default Home;
