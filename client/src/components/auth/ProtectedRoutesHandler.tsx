import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


import {
  loginRoute,
  doctorLoginRoute,
} from "../../data/routes/loginRoutes";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";
import LoadingBar from "../LoadingBar";

interface Props {
  role: UserRole;
}

const ProtectedRoutesHandler: React.FC<Props> = ({ role }) => {
  const { authState, refreshAuth } = useContext(AuthContext);
  const loginPath = loginRoute.path;
  const doctorLoginPath = doctorLoginRoute.path;
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!authState.isAuthenticated) {
        await refreshAuth();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [authState.isAuthenticated, authState.accessToken, authState.role]);

  return isLoading ? (
    <LoadingBar />
  ) : authState.isAuthenticated && role === authState.role ? (
    <Outlet />
  ) : role === UserRole.ADMIN || role === UserRole.PATIENT ? (
    <Navigate to={`${loginPath}`} state={{ from: location }} replace />
  ) : (
    <Navigate
      to={`${doctorLoginPath}`}
      state={{ from: location }}
      replace
    />
  );
};

export default ProtectedRoutesHandler;
