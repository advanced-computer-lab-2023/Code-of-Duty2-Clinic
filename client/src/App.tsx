import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthPackages from './pages/healthPackages';
import PatientPrescriptions from './pages/patientPrescriptions';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         
        <Route path="healthPackages" element={<HealthPackages />} />
        <Route path="patientPrescriptions" element={<PatientPrescriptions />} />

      </Routes>
    </BrowserRouter>
  );
}
