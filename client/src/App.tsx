import './App.css'
import PatientInfo from './components/PatientInfo';
import PatientRegisteredFamilyMembers from './components/PatientRegisteredFamilyMembers';
import {BrowserRouter, Routes, Route, Link, Router} from 'react-router-dom';



   export default function App() {
    return (
     <BrowserRouter>
     <Routes>
      <Route index element={<h1>Index Route</h1>}/>
      <Route path="/patientRegisteredFamilyMembers" element={<PatientRegisteredFamilyMembers/>}/>
      <Route path="/patientInfo" element={<h1>Placeholder</h1>}/>
      </Routes>
     </BrowserRouter>
    )
  }

