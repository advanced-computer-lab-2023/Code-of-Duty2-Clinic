import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import routes from './data/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import PatientRegisteredFamilyMembers from './components/PatientRegisteredFamilyMembers';
import PatientInfo from './components/PatientInfo';
import PatientList from './components/PatientList';

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
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
          <Route path="/patient/:patientId/info" element={<PatientInfo />} />
          <Route path="/patient/:patientId/family-members" element={<PatientRegisteredFamilyMembers />} />
          <Route path="patients" element={<PatientList />} />

        </Routes>
      </Layout>
    </BrowserRouter>
    </QueryClientProvider>
  );
}