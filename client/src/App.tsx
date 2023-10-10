import './App.css'
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthPackages from './pages/healthPackages';
import PatientPrescriptions from './pages/patientPrescriptions';

=======
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import routes from './data/routes';
>>>>>>> 158e4603c516addbcd23334abaebdd70ab1175c1

export default function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
         
        <Route path="healthPackages" element={<HealthPackages />} />
        <Route path="patientPrescriptions" element={<PatientPrescriptions />} />
=======
      <Layout>
        <Routes>
          {routes.map((route, index: number) => (
            <Route
              key={index}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
>>>>>>> 158e4603c516addbcd23334abaebdd70ab1175c1

      </Routes>
    </BrowserRouter>
  );
}
