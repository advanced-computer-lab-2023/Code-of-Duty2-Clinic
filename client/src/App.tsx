import guestRoutes from "./data/routes/guestRoutes";
import patientRoutes from "./data/routes/patientRoutes";
import doctorRoutes from "./data/routes/doctorRoutes";
import adminRoutes from "./data/routes/adminRoutes";
import ProtectedRoutesHandler from "./components/auth/ProtectedRoutesHandler";
import UserRole from "./types/enums/UserRole";
import Layout from "./layouts/Layout";
import generalRoutes from "./data/routes/generalRoutes";
import PublicRoutesHandler from "./components/auth/PublicRoutesHandler";
import LoginRoutesHandler from "./components/auth/LoginRoutesHandler";
import loginRoutes from "./data/routes/loginRoutes";
import axios from "axios";
import {Route, Routes } from 'react-router-dom';


axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Routes>
      <Route element={<LoginRoutesHandler />}>
        {loginRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route element={<PublicRoutesHandler />}>
        {generalRoutes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}

        {guestRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Route>

      <Route element={<ProtectedRoutesHandler role={UserRole.ADMIN} />}>
        {adminRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Route>

      <Route element={<ProtectedRoutesHandler role={UserRole.PATIENT} />}>
        {patientRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Route>

      <Route element={<ProtectedRoutesHandler role={UserRole.DOCTOR} />}>
        {doctorRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Route>
    </Routes>
  );
}