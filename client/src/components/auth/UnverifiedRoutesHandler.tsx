import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import UserRole from "../../types/enums/UserRole";
import { AuthContext } from "../../contexts/AuthContext";
import { doctorLoginRoute } from "../../data/routes/loginRoutes";

const UnverifiedRoutesHandler: React.FC = () => {
  const { authState, refreshAuth } = useContext(AuthContext);
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : authState.isAuthenticated &&
    authState.role === UserRole.UNVERIFIED_DOCTOR ? (
    <Outlet />
  ) : (
    <Navigate to={doctorLoginRoute.path} state={{ from: location }} replace />
  );
};

export default UnverifiedRoutesHandler;
