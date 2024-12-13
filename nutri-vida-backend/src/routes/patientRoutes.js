const express = require("express");
const {
  addPatient, // Controlador que maneja la creación de paciente, dieta y métricas
  getAllPatientsWithDiets,
  getPatientDiet,
  getPatientMetrics, // Nuevo controlador para obtener las métricas
  deletePatient,
} = require("../controllers/patientController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Ruta para obtener todos los pacientes con sus dietas
router.get("/", authMiddleware, getAllPatientsWithDiets);

// Ruta para obtener la dieta de un paciente específico
router.get("/:id/diet", authMiddleware, getPatientDiet);

// Ruta para obtener las métricas de un paciente específico
router.get("/:id/metrics", authMiddleware, getPatientMetrics); // Nueva ruta

// Ruta para agregar un nuevo paciente junto con su dieta y métricas
router.post("/create", authMiddleware, addPatient);

// Ruta para eliminar un paciente
router.delete("/:id", authMiddleware, deletePatient);

module.exports = router;
