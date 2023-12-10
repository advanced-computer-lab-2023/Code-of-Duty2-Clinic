import axios from "axios";
import AppRoutes from "./AppRoutes";
import UserContextProvider from "./contexts/UserContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
import NotificationContextProvider from "./contexts/NotificationContext";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

export default function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationContextProvider>
            <SocketContextProvider>
              <AppRoutes />
            </SocketContextProvider>
          </NotificationContextProvider>
        </AuthProvider>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
