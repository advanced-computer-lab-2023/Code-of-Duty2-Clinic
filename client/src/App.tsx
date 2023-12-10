import axios from "axios";
import AppRoutes from "./AppRoutes";
import UserContextProvider from "./contexts/UserContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import NotificationContextProvider from "./contexts/NotificationContext";
import socket from "./services/Socket";
import { useEffect } from "react";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

export default function App() {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationContextProvider>
            <AppRoutes />
          </NotificationContextProvider>
        </AuthProvider>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
