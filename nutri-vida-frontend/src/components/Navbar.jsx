import React from "react";
import { Link } from "react-router-dom"; // Si usas react-router para la navegación

const Navbar = () => {
  return (
    <div className="flex bg-gray-800 text-white py-4 items-center justify-between">
      <h1 className="text-lg font-semibold ml-6">LifeFit</h1>
      <ul className="flex gap-10 text-m mr-6 items-center">
        <li>
          <Link to="/start">Home</Link>
        </li>
        <li>
          <Link to="/individualuserpage">Usuario</Link>
        </li>
        <li>
          <Link to="/nutritionistuserpage">Nutriologo</Link>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
