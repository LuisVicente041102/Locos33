const pool = require("../config/db");
const { generatePatientPDF } = require("./pdfController");

// Obtener todos los pacientes con sus dietas
const getAllPatientsWithDiets = async (req, res) => {
  try {
    const [patients] = await pool.query(
      `SELECT p.*, d.monday_breakfast, d.monday_lunch, d.monday_dinner,
              d.tuesday_breakfast, d.tuesday_lunch, d.tuesday_dinner,
              d.wednesday_breakfast, d.wednesday_lunch, d.wednesday_dinner,
              d.thursday_breakfast, d.thursday_lunch, d.thursday_dinner,
              d.friday_breakfast, d.friday_lunch, d.friday_dinner,
              d.saturday_breakfast, d.saturday_lunch, d.saturday_dinner,
              d.sunday_breakfast, d.sunday_lunch, d.sunday_dinner,
              p.created_at
       FROM patients p
       LEFT JOIN patient_diets d ON p.id = d.patient_id
       WHERE p.user_id = ?`,
      [req.userId]
    );
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pacientes", error });
  }
};

// Obtener la dieta de un paciente específico
const getPatientDiet = async (req, res) => {
  const { id } = req.params;
  try {
    const [diet] = await pool.query(
      `SELECT monday_breakfast, monday_lunch, monday_dinner,
              tuesday_breakfast, tuesday_lunch, tuesday_dinner,
              wednesday_breakfast, wednesday_lunch, wednesday_dinner,
              thursday_breakfast, thursday_lunch, thursday_dinner,
              friday_breakfast, friday_lunch, friday_dinner,
              saturday_breakfast, saturday_lunch, saturday_dinner,
              sunday_breakfast, sunday_lunch, sunday_dinner
       FROM patient_diets
       WHERE patient_id = ?`,
      [id]
    );
    if (diet.length > 0) {
      res.json(diet[0]);
    } else {
      res.status(404).json({ message: "Dieta no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la dieta del paciente", error });
  }
};

// Agregar un nuevo paciente con su dieta y generar PDF
const addPatient = async (req, res) => {
  const { first_name, last_name, email, phone_number, diet, metrics } =
    req.body;
  const userId = req.userId; // Obtener el userId del token de autenticación
  console.log("Datos recibidos:", {
    first_name,
    last_name,
    email,
    phone_number,
    diet,
    metrics,
  });

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Inserta el paciente en la tabla 'patients' con el userId
    const [patientResult] = await connection.query(
      "INSERT INTO patients (user_id, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?)",
      [userId, first_name, last_name, email, phone_number] // Incluye userId en la inserción
    );

    const patientId = patientResult.insertId;

    // Inserta la dieta del paciente en la tabla 'patient_diets'
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
    } = diet;

    await connection.query(
      `INSERT INTO patient_diets 
      (patient_id, monday_breakfast, monday_lunch, monday_dinner, tuesday_breakfast, tuesday_lunch, tuesday_dinner, wednesday_breakfast, wednesday_lunch, wednesday_dinner, thursday_breakfast, thursday_lunch, thursday_dinner, friday_breakfast, friday_lunch, friday_dinner, saturday_breakfast, saturday_lunch, saturday_dinner, sunday_breakfast, sunday_lunch, sunday_dinner) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId,
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

    // Inserta las métricas del paciente en la tabla 'patient_metrics'
    const {
      weight_kg,
      height_cm,
      waist_circumference,
      hip_circumference,
      skinfold_thickness,
      daily_calories,
    } = metrics;
    const height_m = height_cm / 100;
    const imc = (weight_kg / (height_m * height_m)).toFixed(2);
    const waist_hip_ratio = (waist_circumference / hip_circumference).toFixed(
      2
    );

    await connection.query(
      `INSERT INTO patient_metrics (patient_id, weight_kg, height_cm, imc, waist_circumference, hip_circumference, waist_hip_ratio, skinfold_thickness, daily_calories)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId,
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

    await connection.commit();

    // Llamar a la función para generar el PDF después de insertar todos los datos
    const patientData = {
      first_name,
      last_name,
      email,
      phone_number,
      diet: {
        monday_breakfast,
        monday_lunch,
        monday_dinner,
        tuesday_breakfast,
        tuesday_lunch,
        tuesday_dinner,
      },
      metrics: {
        weight_kg,
        height_cm,
        imc,
        daily_calories,
      },
    };

    generatePatientPDF(patientData, res); // Generar y descargar el PDF
  } catch (error) {
    console.error("Error al agregar el paciente, dieta o métricas:", error);
    await connection.rollback();
    res.status(500).json({
      message: "Error al agregar el paciente, dieta o métricas",
      error,
    });
  } finally {
    connection.release();
  }
};

// Eliminar un paciente
const deletePatient = async (req, res) => {
  const { id } = req.params;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Eliminar la dieta del paciente
    await connection.query("DELETE FROM patient_diets WHERE patient_id = ?", [
      id,
    ]);

    // Eliminar al paciente
    await connection.query("DELETE FROM patients WHERE id = ?", [id]);

    await connection.commit();
    res.status(200).json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: "Error al eliminar el paciente", error });
  } finally {
    connection.release();
  }
};

const getPatientMetrics = async (req, res) => {
  const { id } = req.params;
  try {
    const [metrics] = await pool.query(
      `SELECT weight_kg, height_cm, imc, waist_circumference, hip_circumference,
              waist_hip_ratio, skinfold_thickness, daily_calories
       FROM patient_metrics
       WHERE patient_id = ?`,
      [id]
    );
    if (metrics.length > 0) {
      res.json(metrics[0]); // Devolver solo la primera métrica
    } else {
      res.status(404).json({ message: "Métricas no encontradas" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las métricas del paciente", error });
  }
};

module.exports = {
  getAllPatientsWithDiets,
  getPatientDiet,
  addPatient,
  deletePatient,
  getPatientMetrics,
};
