import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthPackages from './pages/HealthPackages';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         
        <Route path="healthPackages" element={<HealthPackages />} />
        
      </Routes>
    </BrowserRouter>
  );
}
