/**
 *
 * This handler ensures login routes are not accessible to already authenticated users.
 *
 * Any login route should be a child of this component, thus forcing any access to a login page
 * to pass by this component first before loading the login page, as login routes should only
 * be accessible to unauthenticated users, and after they log in, they shouldn't be able to
 * access the login pages/routes anymore. If a user is already logged in, they should be redirected
 * to their respective dashboard. Thus, this handler wraps the login routes to enforce this logic.
 *
 * Otherwise, actual redirection after actually logging in with credentials should be handled
 * in the actual login page(s).
 *
 */

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { doctorDashboardRoute } from "../../data/routes/doctorRoutes";
import UserRole from "../../types/enums/UserRole";
import { pageNotFoundRoute } from "../../data/routes/generalRoutes";
import { doctorUnverifiedRoute } from "../../data/routes/unverifiedRoutes";

const LoginRoutesHandler = () => {
  const { authState } = useContext(AuthContext);

  return authState.isAuthenticated ? (
    authState.role === UserRole.PATIENT ? (
      <Navigate to={patientDashboardRoute.path} replace />
    ) : authState.role === UserRole.ADMIN ? (
      <Navigate to={adminDashboardRoute.path} replace />
    ) : authState.role === UserRole.DOCTOR ? (
      <Navigate to={doctorDashboardRoute.path} replace />
    ) : authState.role === UserRole.UNVERIFIED_DOCTOR ? (
      <Navigate to={doctorUnverifiedRoute.path} replace />
    ) : (
      <Navigate to={pageNotFoundRoute.path} replace />
    )
  ) : (
    <Outlet />
  );
};

export default LoginRoutesHandler;
