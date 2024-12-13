import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Banner from "../components/Banner"; // Asegúrate de que la ruta sea correcta

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Sección del formulario */}
      <div className="col-span-4 bg-black flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8">
          <h1 className="text-4xl text-white mb-6 text-center">
            Crear una cuenta
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-sm text-white font-medium">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Escribe tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black py-3 px-4 border border-gray-500 rounded-md text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm text-white font-medium">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="Escribe tu correo"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black py-3 px-4 border border-gray-500 rounded-md text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm text-white font-medium">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="Escribe tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-black py-3 px-4 border border-gray-500 rounded-md text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full py-4 bg-blue-700 hover:bg-blue-500 rounded-md text-white text-lg"
            >
              Registrarse
            </button>
          </form>

          {/* Mensaje de éxito o error */}
          {message && <p className="mt-4 text-sm text-green-500">{message}</p>}

          {/* Texto de iniciar sesión */}
          <p className="mt-6 text-sm text-gray-400 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Sección del banner */}
      <div className="col-span-8">
        <Banner />
      </div>
    </div>
  );
};

export default RegisterForm;
