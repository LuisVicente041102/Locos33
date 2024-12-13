const express = require("express");
const {
  saveAppointment,
  getAppointmentsByPatient,
  deleteAppointment,
  getAllAppointments, // Nueva función para obtener todas las citas
} = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Ruta para agregar una nueva cita
router.post("/", authMiddleware, saveAppointment);

// Ruta para obtener citas de un paciente específico
router.get("/:patient_id", authMiddleware, getAppointmentsByPatient);

// Ruta para eliminar una cita por su ID
router.delete("/:id", authMiddleware, deleteAppointment);

// Nueva ruta para obtener todas las citas
router.get("/", authMiddleware, getAllAppointments);

module.exports = router;
