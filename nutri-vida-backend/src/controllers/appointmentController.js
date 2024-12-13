const pool = require("../config/db");
const twilio = require("twilio");

// Configura Twilio con tu Account SID y Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Guardar una nueva cita y enviar recordatorio
const saveAppointment = async (req, res) => {
  const { patient_id, appointment_date, appointment_reason, phone_number } =
    req.body;

  try {
    await pool.query(
      `INSERT INTO appointments (patient_id, appointment_date, appointment_reason, phone_number) VALUES (?, ?, ?, ?)`,
      [patient_id, appointment_date, appointment_reason, phone_number]
    );

    const message = await client.messages.create({
      body: `Recordatorio: Tienes una cita el ${appointment_date}. Razón: ${appointment_reason}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `whatsapp:${phone_number}`,
    });

    console.log("Mensaje enviado:", message.sid);
    res
      .status(201)
      .json({ message: "Cita guardada y recordatorio enviado correctamente" });
  } catch (error) {
    console.error("Error en saveAppointment:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener citas de un paciente
const getAppointmentsByPatient = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const [appointments] = await pool.query(
      `SELECT * FROM appointments WHERE patient_id = ?`,
      [patient_id]
    );
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error en getAppointmentsByPatient:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar una cita
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM appointments WHERE id = ?`, [id]);
    res.status(200).json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error("Error en deleteAppointment:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Nueva función para obtener todas las citas
const getAllAppointments = async (req, res) => {
  try {
    const [appointments] = await pool.query(`SELECT * FROM appointments`);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error en getAllAppointments:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  saveAppointment,
  getAppointmentsByPatient,
  deleteAppointment,
  getAllAppointments, // Exportar la nueva función
};
