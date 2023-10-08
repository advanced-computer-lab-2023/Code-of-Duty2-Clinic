import './App.css'
import PatientRegisteredFamilyMembers from './components/PatientRegisteredFamilyMembers';
import {BrowserRouter, Routes, Route, Link, Router} from 'react-router-dom';



   export default function App() {
    return (
     <BrowserRouter>
     <Routes>
      <Route index element={<h1>Index Route</h1>}/>
      <Route path="/registeredFamilyMembers" element={<PatientRegisteredFamilyMembers/>}/>
      </Routes>
     </BrowserRouter>
    )
  }

