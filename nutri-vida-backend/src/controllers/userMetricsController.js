const pool = require("../config/db");

const saveUserMetrics = async (req, res) => {
  const {
    weight_kg,
    height_cm,
    imc,
    waist_circumference,
    hip_circumference,
    waist_hip_ratio,
    skinfold_thickness,
    daily_calories,
  } = req.body;
  const userId = req.userId; // Asegúrate de que `req.userId` está definido

  try {
    // Verificar que `userId` esté presente
    if (!userId) {
      return res
        .status(400)
        .json({ message: "El ID del usuario no está presente" });
    }

    // Insertar los datos en la base de datos
    await pool.query(
      `INSERT INTO user_metrics 
          (user_id, weight_kg, height_cm, imc, waist_circumference, 
          hip_circumference, waist_hip_ratio, skinfold_thickness, daily_calories) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        weight_kg,
        height_cm,
        imc,
        waist_circumference,
        hip_circumference,
        waist_hip_ratio,
        skinfold_thickness,
        daily_calories,
      ]
    );
    res.status(201).json({ message: "Métricas guardadas exitosamente" });
  } catch (error) {
    console.error("Error al guardar las métricas:", error); // Verificar si hay más información del error aquí
    res.status(500).json({ message: "Error al guardar las métricas", error });
  }
};

// Obtener las métricas del usuario
const getUserMetrics = async (req, res) => {
  const userId = req.userId;
  try {
    const [metrics] = await pool.query(
      "SELECT * FROM user_metrics WHERE user_id = ?",
      [userId]
    );
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las métricas", error });
  }
};

// Eliminar una métrica por ID
const deleteUserMetric = async (req, res) => {
  const metricId = req.params.id;
  try {
    await pool.query("DELETE FROM user_metrics WHERE id = ?", [metricId]);
    res.status(200).json({ message: "Métrica eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la métrica", error });
  }
};

module.exports = { saveUserMetrics, getUserMetrics, deleteUserMetric };
