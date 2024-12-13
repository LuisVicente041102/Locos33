// src/pages/AppointmentCalendar.jsx
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "../config/axiosConfig";
import useAuth from "../hooks/useAuth";

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      console.error("Usuario no autenticado");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointments"); // El token se envía automáticamente con el interceptor de axios
        const events = response.data.map((appointment) => ({
          title: appointment.appointment_reason,
          start: new Date(appointment.appointment_date).toISOString(), // Asegúrate de que está en formato ISO
          extendedProps: {
            patientId: appointment.patient_id,
            phoneNumber: appointment.phone_number,
          },
        }));
        setAppointments(events);
      } catch (error) {
        console.error("Error al cargar las citas:", error);
      }
    };

    fetchAppointments();
  }, [isAuthenticated]);

  return (
    <div>
      <h2>Calendario de Citas</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={appointments}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={(info) =>
          alert(
            `Cita: ${info.event.title}\nNúmero de Teléfono: ${info.event.extendedProps.phoneNumber}`
          )
        }
      />
    </div>
  );
};

export default AppointmentCalendar;
