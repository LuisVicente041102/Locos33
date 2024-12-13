import React from "react";
import bannerImage from "../assets/banner-nutrition.png"; // Importa la imagen desde la carpeta assets

const Banner = () => {
  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* Puedes agregar contenido adicional dentro del banner si lo necesitas */}
    </div>
  );
};

export default Banner;
