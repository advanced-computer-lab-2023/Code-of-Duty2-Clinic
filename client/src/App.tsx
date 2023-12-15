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
      retry: 3
    }
  }
});

export default function App() {
  useEffect(() => {
    socket.on("error", ({ message }) => {
      console.log(message);
    });
    socket.on("message", (message) => {
      console.log(message);
    });
    socket.emit("message", "hello");
    return () => {
      if (socket.connected) socket.disconnect();
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
