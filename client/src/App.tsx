import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import routes from './data/routes';
import PatientRegisteredFamilyMembers from './components/PatientRegisteredFamilyMembers';
import PatientInfo from './components/PatientInfo';
import PatientList from './components/PatientList';


export default function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route path="/patient-info/:id" element={<PatientInfo />} />
          <Route path="/patient-family-members/:id" element={<PatientRegisteredFamilyMembers />} />
          <Route path="patients" element={<PatientList />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

