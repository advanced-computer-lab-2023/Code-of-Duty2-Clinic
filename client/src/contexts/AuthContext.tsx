import axios, { HttpStatusCode } from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";

import UserRole from "../types/enums/UserRole";
import { config } from "../configuration";
import { useNavigate } from "react-router-dom";
import { adminDashboardRoute } from "../data/routes/adminRoutes";
import { doctorDashboardRoute } from "../data/routes/doctorRoutes";
import { patientDashboardRoute } from "../data/routes/patientRoutes";
import { welcomeRoute } from "../data/routes/guestRoutes";

interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: UserRole;
}

interface IAuthContext {
  authState: IAuthState;
  login: (accessToken: string, role: UserRole) => void;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<string>;
}

const AuthContext = createContext<IAuthContext>({
  authState: {
    isAuthenticated: false,
    accessToken: null,
    role: UserRole.GUEST,
  },
  login: () => {},
  logout: () => Promise.resolve(),
  refreshAuth: () => Promise.resolve(""),
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuthenticated: false,
    accessToken: null,
    role: UserRole.GUEST,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use((response) => response,
      async (error) => {
        const originalRequest = error.config;
        if(originalRequest._retry) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;
        
        switch(error.response?.status) {
          case HttpStatusCode.Forbidden:
            navigateToUserDashboardPage();
            break;

          case HttpStatusCode.Unauthorized:
            if (isRefreshTokenExpired(error, originalRequest)) {
              await logout();
            } 
            else {
              return await resendRequestWithNewAccessToken(refreshAuth, originalRequest);
            }
            break;

          default:
            break;
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  function navigateToUserDashboardPage() {
    switch (authState.role) {
      case UserRole.ADMIN:
        navigate(adminDashboardRoute.path);
        break;
      case UserRole.DOCTOR:
        navigate(doctorDashboardRoute.path);
        break;
      case UserRole.PATIENT:
        navigate(patientDashboardRoute.path);
        break;
      default:
        navigate(welcomeRoute.path);
        break;
    }
  }
  
  useEffect(() => {
    if (authState.isAuthenticated) {
      setAuthorizationHeader(authState.accessToken!);
    }
  }, [authState]);

  const login = (accessToken: string, role: UserRole) => {
    setAuthState({
      isAuthenticated: true,
      accessToken,
      role,
    });
    setAuthorizationHeader(accessToken);
  };

  const logout = async () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      role: UserRole.GUEST,
    });

    try {
      await axios.post(`${config.serverUri}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Error during logout", error);
    }
    clearAuthorizationHeader();
  };

  const refreshAuth = async () => {
    try {
      const response = await axios.post(`${config.serverUri}/${config.refreshTokenEndpoint}`, {}, { withCredentials: true });
      login(response.data.accessToken, response.data.role);
      return response.data.accessToken;
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

function setAuthorizationHeader(accessToken: string) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}
function clearAuthorizationHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

async function resendRequestWithNewAccessToken(refreshAuth: () => Promise<any>, originalRequest: any) {
  const newToken = await refreshAuth();
  originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
  return axios(originalRequest);
}

function isRefreshTokenExpired(error: any, originalRequest: any) {
  return !error.response.data.accessTokenExpired || originalRequest.url.endsWith(`/${config.refreshTokenEndpoint}`);
}

export { AuthContext, AuthProvider };
  

