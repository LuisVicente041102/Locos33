import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar"; // Asegúrate de que el componente Navbar esté aquí

const NavbarLayout = () => {
  const location = useLocation();

  // Ocultar la navbar en las páginas de login y register
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet /> {/* Renderiza el contenido de la ruta */}
    </>
  );
};

export default NavbarLayout;
