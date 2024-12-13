const express = require("express");
const {
  createDietController,
  getDietsController,
  getDietByIdController,
  updateDietController,
  deleteDietController,
} = require("../controllers/dietController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createDietController); // Crear dieta
router.get("/", authMiddleware, getDietsController); // Obtener todas las dietas
router.get("/:id", authMiddleware, getDietByIdController); // Obtener dieta por ID
router.put("/:id", authMiddleware, updateDietController); // Actualizar dieta
router.delete("/:id", authMiddleware, deleteDietController); // Eliminar dieta

module.exports = router;
