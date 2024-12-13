const { createDiet, getDietsByUserId } = require("../models/Diet");
const { getDietById, updateDietById } = require("../models/Diet");

// Controlador para crear una nueva dieta
const createDietController = async (req, res) => {
  const userId = req.userId; // Asumimos que `userId` está en el request (después de verificar el token)
  const dietData = req.body;

  try {
    await createDiet(userId, dietData);
    res.status(201).json({ message: "Dieta creada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la dieta", error });
  }
};

// Controlador para obtener todas las dietas de un usuario
const getDietsController = async (req, res) => {
  const userId = req.userId;

  try {
    const diets = await getDietsByUserId(userId);
    res.status(200).json(diets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las dietas", error });
  }
};

const { deleteDietById } = require("../models/Diet");

// Controlador para eliminar una dieta
const deleteDietController = async (req, res) => {
  const dietId = req.params.id;
  try {
    await deleteDietById(dietId);
    res.status(200).json({ message: "Dieta eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la dieta", error });
  }
};

// Obtener una dieta por ID
const getDietByIdController = async (req, res) => {
  const dietId = req.params.id;
  try {
    const diet = await getDietById(dietId);
    if (!diet) {
      return res.status(404).json({ message: "Dieta no encontrada" });
    }
    res.status(200).json(diet);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la dieta", error });
  }
};

// Actualizar una dieta por ID
const updateDietController = async (req, res) => {
  const dietId = req.params.id;
  const dietData = req.body;
  try {
    await updateDietById(dietId, dietData);
    res.status(200).json({ message: "Dieta actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la dieta", error });
  }
};

module.exports = {
  createDietController,
  getDietsController,
  deleteDietController,
  getDietByIdController,
  updateDietController,
};
