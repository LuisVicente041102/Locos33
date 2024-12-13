import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Dirección del backend
        changeOrigin: true, // Cambia el origen de la solicitud
        secure: false, // Desactiva SSL para backend local
      },
    },
  },
});
