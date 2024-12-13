const { findUserByEmail, createUser } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/emailConfig"); // Configuración de nodemailer
const pool = require("../config/db"); // Importar la conexión a la base de datos

// Controlador de restablecimiento de contraseña
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar un token de restablecimiento
    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Enviar el correo con el enlace de restablecimiento
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Restablecimiento de contraseña",
      text: `Hola,\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n\n${resetLink}\n\nSi no solicitaste este correo, ignóralo.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        return res.status(500).json({ message: "Error al enviar el correo" });
      }

      res.status(200).json({
        message:
          "Se ha enviado un enlace de restablecimiento a tu correo electrónico.",
      });
    });
  } catch (error) {
    console.error("Error al solicitar el restablecimiento:", error);
    res.status(500).json({ message: "Error al solicitar el restablecimiento" });
  }
};

// Controlador para restablecer la contraseña
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña del usuario
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.status(400).json({ message: "Token inválido o expirado." });
  }
};

// Controlador de login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  // Verificar si el correo ha sido verificado
  if (!user.is_verified) {
    return res.status(400).json({
      message: "Por favor verifica tu correo electrónico para iniciar sesión",
    });
  }

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  // Usar la clave secreta desde variables de entorno
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // El token expira en 1 hora
  });

  // Enviar el token al cliente
  res.json({ token });
};

// Controlador de registro
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ message: "El correo ya está en uso" });
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear el usuario con is_verified en false
  const newUser = await createUser(name, email, hashedPassword, false); // false porque aún no está verificado

  // Generar un token de verificación
  const verificationToken = jwt.sign(
    { userId: newUser.insertId, email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d", // Token de verificación expira en 1 día
    }
  );

  // Enlace de verificación
  const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;

  // Enviar el correo de verificación
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verificación de correo electrónico",
    text: `Hola ${name},\n\nPor favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:\n\n${verificationLink}\n\nGracias!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo de verificación:", error);
      return res
        .status(500)
        .json({ message: "Error al enviar el correo de verificación" });
    }

    res.status(201).json({
      message:
        "Usuario registrado exitosamente. Revisa tu correo para verificar tu cuenta.",
    });
  });
};

// Controlador de verificación de correo electrónico
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verificar y decodificar el token
    console.log("Token recibido:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);
    const userId = decoded.userId;

    // Verificar si el usuario existe
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    console.log("Usuario encontrado:", user);

    if (!user.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el correo ya ha sido verificado
    if (user[0].is_verified) {
      return res
        .status(400)
        .json({ message: "El correo ya ha sido verificado" });
    }

    // Actualizar el estado del usuario a verificado
    await pool.query("UPDATE users SET is_verified = true WHERE id = ?", [
      userId,
    ]);

    res.status(200).json({ message: "Correo verificado exitosamente" });
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    res.status(400).json({ message: "Token inválido o expirado" });
  }
};

module.exports = {
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
