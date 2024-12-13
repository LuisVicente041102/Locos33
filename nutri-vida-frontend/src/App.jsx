import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartDiet from "./pages/StartDiet";
import AddDiet from "./pages/AddDiet";
import ViewDiets from "./pages/ViewDiets";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import EditDiet from "./pages/EditDiet";
import ViewMetrics from "./pages/ViewMetrics";
import AddPatient from "./pages/AddPatient";
import ViewPatients from "./pages/ViewPatients";
import PatientList from "./pages/PatientList";
import PatientDiet from "./pages/PatientDiet";
import PatientMetrics from "./pages/PatientMetrics";
import IndividualUserPage from "./pages/IndividualUserPage";
import NutritionistUserPage from "./pages/NutritionistUserPage";
import AddAppointment from "./pages/AddAppointment";
import Start from "./pages/Start";
import VerifyEmail from "./pages/VerifyEmail";
import NavbarLayout from "./components/NavbarLayout";
import AppointmentCalendar from "./pages/AppointmentCalendar"; // Importar el nuevo componente
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/start-diet" element={<StartDiet />} />
          <Route path="/add-diet" element={<AddDiet />} />
          <Route path="/view-diets" element={<ViewDiets />} />
          <Route path="/edit-diet/:id" element={<EditDiet />} />
          <Route path="/view-metrics" element={<ViewMetrics />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/patients" element={<ViewPatients />} />
          <Route path="/patients-l" element={<PatientList />} />
          <Route path="/patient-diet/:id" element={<PatientDiet />} />
          <Route path="/patient-metrics/:id" element={<PatientMetrics />} />
          <Route path="/start" element={<Start />} />
          <Route path="/individualuserpage" element={<IndividualUserPage />} />
          <Route path="/addappointment" element={<AddAppointment />} />
          <Route
            path="/nutritionistuserpage"
            element={<NutritionistUserPage />}
          />
          <Route
            path="/appointments-calendar"
            element={<AppointmentCalendar />}
          />{" "}
          {/* Nueva ruta para el calendario */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
