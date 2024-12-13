const express = require("express");
const {
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController"); // Importar controladores

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword); // Nueva ruta para solicitar restablecimiento
router.post("/reset-password", resetPassword); // Nueva ruta para restablecer la contraseña

module.exports = router;
