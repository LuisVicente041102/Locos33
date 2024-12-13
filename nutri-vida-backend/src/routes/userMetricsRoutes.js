const express = require("express");
const {
  saveUserMetrics,
  getUserMetrics,
  deleteUserMetric,
} = require("../controllers/userMetricsController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, saveUserMetrics);
router.get("/", authMiddleware, getUserMetrics); // Obtener las métricas
router.delete("/:id", authMiddleware, deleteUserMetric); // Eliminar métrica

module.exports = router;
