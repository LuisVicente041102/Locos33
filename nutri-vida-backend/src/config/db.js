const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nutrividadb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificar la conexión
pool
  .getConnection()
  .then((connection) => {
    console.log("Conexión exitosa a la base de datos");
    connection.release(); // Soltar la conexión
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err.message);
  });

module.exports = pool;
