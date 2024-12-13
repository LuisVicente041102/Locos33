const PDFDocument = require("pdfkit");

const generatePatientPDF = (patientData, res) => {
  const doc = new PDFDocument({
    margin: 50, // Ajusta el margen de la página
  });

  // Establece los encabezados para la descarga del PDF
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${patientData.first_name}_${patientData.last_name}_info.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  // Generar el PDF y enviarlo como respuesta
  doc.pipe(res);

  // Fuente y colores
  doc
    .font("Helvetica-Bold") // Fuente en negrita
    .fontSize(20)
    .fillColor("#007BFF") // Color azul
    .text("Información del Paciente", { align: "center" });

  doc.moveDown();

  // Información básica del paciente
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("black") // Volver al color negro
    .text(`Nombre: ${patientData.first_name} ${patientData.last_name}`)
    .moveDown()
    .text(`Correo Electrónico: ${patientData.email}`)
    .moveDown()
    .text(`Teléfono: ${patientData.phone_number}`);

  doc.moveDown(2); // Añadir espacio entre secciones

  // Línea separadora
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Crear una línea horizontal

  // Métricas del paciente
  doc
    .moveDown()
    .font("Helvetica-Bold")
    .fontSize(15)
    .text("Métricas del Paciente");

  doc
    .moveDown()
    .font("Helvetica")
    .fontSize(12)
    .text(`Peso: ${patientData.metrics.weight_kg} kg`)
    .moveDown()
    .text(`Altura: ${patientData.metrics.height_cm} cm`)
    .moveDown()
    .text(`IMC: ${patientData.metrics.imc}`)
    .moveDown()
    .text(`Calorías diarias: ${patientData.metrics.daily_calories}`);

  doc.moveDown(2);

  // Línea separadora
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // Dieta del paciente
  doc.moveDown().font("Helvetica-Bold").fontSize(15).text("Dieta del Paciente");

  doc
    .moveDown()
    .font("Helvetica")
    .fontSize(12)
    .text(`Lunes Desayuno: ${patientData.diet.monday_breakfast}`)
    .moveDown()
    .text(`Lunes Almuerzo: ${patientData.diet.monday_lunch}`)
    .moveDown()
    .text(`Lunes Cena: ${patientData.diet.monday_dinner}`)
    .moveDown()
    .text(`Martes Desayuno: ${patientData.diet.tuesday_breakfast}`)
    .moveDown()
    .text(`Martes Almuerzo: ${patientData.diet.tuesday_lunch}`)
    .moveDown()
    .text(`Martes Cena: ${patientData.diet.tuesday_dinner}`);

  // Terminar el documento
  doc.end();
};

module.exports = { generatePatientPDF };
