import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/patients", {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los headers
          },
        });
        setPatients(response.data); // Guardar los pacientes en el estado
      } catch (error) {
        console.error("Error al obtener los pacientes", error); // Manejar el error
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Fecha de Consulta</th>
            <th>Lunes Desayuno</th>
            <th>Lunes Almuerzo</th>
            <th>Lunes Cena</th>
            <th>Martes Desayuno</th>
            <th>Martes Almuerzo</th>
            <th>Martes Cena</th>
            <th>Miércoles Desayuno</th>
            <th>Miércoles Almuerzo</th>
            <th>Miércoles Cena</th>
            <th>Jueves Desayuno</th>
            <th>Jueves Almuerzo</th>
            <th>Jueves Cena</th>
            <th>Viernes Desayuno</th>
            <th>Viernes Almuerzo</th>
            <th>Viernes Cena</th>
            <th>Sábado Desayuno</th>
            <th>Sábado Almuerzo</th>
            <th>Sábado Cena</th>
            <th>Domingo Desayuno</th>
            <th>Domingo Almuerzo</th>
            <th>Domingo Cena</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>
                {patient.first_name} {patient.last_name}
              </td>
              <td>{patient.email}</td>
              <td>
                {new Date(patient.created_at).toLocaleDateString() || "-"}
              </td>
              <td>{patient.monday_breakfast || "-"}</td>
              <td>{patient.monday_lunch || "-"}</td>
              <td>{patient.monday_dinner || "-"}</td>
              <td>{patient.tuesday_breakfast || "-"}</td>
              <td>{patient.tuesday_lunch || "-"}</td>
              <td>{patient.tuesday_dinner || "-"}</td>
              <td>{patient.wednesday_breakfast || "-"}</td>
              <td>{patient.wednesday_lunch || "-"}</td>
              <td>{patient.wednesday_dinner || "-"}</td>
              <td>{patient.thursday_breakfast || "-"}</td>
              <td>{patient.thursday_lunch || "-"}</td>
              <td>{patient.thursday_dinner || "-"}</td>
              <td>{patient.friday_breakfast || "-"}</td>
              <td>{patient.friday_lunch || "-"}</td>
              <td>{patient.friday_dinner || "-"}</td>
              <td>{patient.saturday_breakfast || "-"}</td>
              <td>{patient.saturday_lunch || "-"}</td>
              <td>{patient.saturday_dinner || "-"}</td>
              <td>{patient.sunday_breakfast || "-"}</td>
              <td>{patient.sunday_lunch || "-"}</td>
              <td>{patient.sunday_dinner || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPatients;
