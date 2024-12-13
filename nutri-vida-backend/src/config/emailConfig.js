const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // O el servicio que estés utilizando
  auth: {
    user: process.env.EMAIL_USER, // Email configurado en tu archivo .env
    pass: process.env.EMAIL_PASS, // Contraseña o token de aplicación configurado en tu archivo .env
  },
});

module.exports = transporter;
