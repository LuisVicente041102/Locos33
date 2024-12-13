const pool = require("../config/db");

// Crear una nueva dieta para un usuario
const createDiet = async (userId, dietData) => {
  const {
    monday_breakfast,
    monday_lunch,
    monday_dinner,
    tuesday_breakfast,
    tuesday_lunch,
    tuesday_dinner,
    wednesday_breakfast,
    wednesday_lunch,
    wednesday_dinner,
    thursday_breakfast,
    thursday_lunch,
    thursday_dinner,
    friday_breakfast,
    friday_lunch,
    friday_dinner,
    saturday_breakfast,
    saturday_lunch,
    saturday_dinner,
    sunday_breakfast,
    sunday_lunch,
    sunday_dinner,
  } = dietData;

  const [result] = await pool.query(
    `INSERT INTO diets (
            user_id, monday_breakfast, monday_lunch, monday_dinner,
            tuesday_breakfast, tuesday_lunch, tuesday_dinner,
            wednesday_breakfast, wednesday_lunch, wednesday_dinner,
            thursday_breakfast, thursday_lunch, thursday_dinner,
            friday_breakfast, friday_lunch, friday_dinner,
            saturday_breakfast, saturday_lunch, saturday_dinner,
            sunday_breakfast, sunday_lunch, sunday_dinner
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      monday_breakfast,
      monday_lunch,
      monday_dinner,
      tuesday_breakfast,
      tuesday_lunch,
      tuesday_dinner,
      wednesday_breakfast,
      wednesday_lunch,
      wednesday_dinner,
      thursday_breakfast,
      thursday_lunch,
      thursday_dinner,
      friday_breakfast,
      friday_lunch,
      friday_dinner,
      saturday_breakfast,
      saturday_lunch,
      saturday_dinner,
      sunday_breakfast,
      sunday_lunch,
      sunday_dinner,
    ]
  );
  return result;
};

// Obtener todas las dietas de un usuario
const getDietsByUserId = async (userId) => {
  const [rows] = await pool.query("SELECT * FROM diets WHERE user_id = ?", [
    userId,
  ]);
  return rows;
};

// Función para eliminar la dieta por ID
const deleteDietById = async (dietId) => {
  await pool.query("DELETE FROM diets WHERE id = ?", [dietId]);
};

// Obtener una dieta por ID
const getDietById = async (dietId) => {
  const [rows] = await pool.query("SELECT * FROM diets WHERE id = ?", [dietId]);
  return rows[0];
};

// Actualizar una dieta por ID
const updateDietById = async (dietId, dietData) => {
  await pool.query(
    `UPDATE diets SET 
        monday_breakfast = ?, monday_lunch = ?, monday_dinner = ?,
        tuesday_breakfast = ?, tuesday_lunch = ?, tuesday_dinner = ?,
        wednesday_breakfast = ?, wednesday_lunch = ?, wednesday_dinner = ?,
        thursday_breakfast = ?, thursday_lunch = ?, thursday_dinner = ?,
        friday_breakfast = ?, friday_lunch = ?, friday_dinner = ?,
        saturday_breakfast = ?, saturday_lunch = ?, saturday_dinner = ?,
        sunday_breakfast = ?, sunday_lunch = ?, sunday_dinner = ?
      WHERE id = ?`,
    [
      dietData.monday_breakfast,
      dietData.monday_lunch,
      dietData.monday_dinner,
      dietData.tuesday_breakfast,
      dietData.tuesday_lunch,
      dietData.tuesday_dinner,
      dietData.wednesday_breakfast,
      dietData.wednesday_lunch,
      dietData.wednesday_dinner,
      dietData.thursday_breakfast,
      dietData.thursday_lunch,
      dietData.thursday_dinner,
      dietData.friday_breakfast,
      dietData.friday_lunch,
      dietData.friday_dinner,
      dietData.saturday_breakfast,
      dietData.saturday_lunch,
      dietData.saturday_dinner,
      dietData.sunday_breakfast,
      dietData.sunday_lunch,
      dietData.sunday_dinner,
      dietId,
    ]
  );
};

module.exports = {
  createDiet,
  getDietsByUserId,
  deleteDietById,
  getDietById,
  updateDietById,
};
