const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configurar CORS para permitir cualquier origen (solo para desarrollo)
app.use(
  cors({
    origin: "*", // Permite todos los orígenes
    credentials: true, // Habilita cookies, encabezados de autenticación, etc.
  })
);

app.use(express.json());

// Rutas
const userRoutes = require("./src/routes/userRoutes");
const dietRoutes = require("./src/routes/dietRoutes");
const userMetricsRoutes = require("./src/routes/userMetricsRoutes");
const patientRoutes = require("./src/routes/patientRoutes");
const patientMetricsRoutes = require("./src/routes/patientMetricsRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");

app.use("/api/users", userRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/user-metrics", userMetricsRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes); // Ruta de citas configurada correctamente

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
