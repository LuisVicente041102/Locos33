const pool = require("../config/db");

// Función para buscar un usuario por correo
const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0]; // Retorna el usuario si se encuentra
};

// Función para crear un usuario
const createUser = async (name, email, password) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result;
};

module.exports = { createUser, findUserByEmail };
