import { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "../types";
import socket from "../services/Socket";
import axios from "axios";
import { config } from "../configuration";
import UserRole from "../types/enums/UserRole";
import { AuthContext } from "./AuthContext";

type NotificationContextType = {
  notifications: Notification[] | null;
  setNotifications: React.Dispatch<Notification[] | null>;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
};
export const NotificationContext = createContext<NotificationContextType>({
  notifications: null,
  setNotifications: () => {},
  addNotification: () => {},
  removeNotification: () => {}
});

const getAllNotifications = async (role: UserRole): Promise<Notification[]> => {
  console.log(role);
  const userRolePath = role === UserRole.DOCTOR ? "doctors" : "patients";
  const response = await axios.get(`${config.serverUri}/${userRolePath}/notifications`);
  return response.data;
};

type ProviderProps = {
  children: React.ReactNode;
};
const NotificationContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[] | null>(null);

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.role === UserRole.DOCTOR || authState.role === UserRole.PATIENT) {
      getAllNotifications(authState.role).then((data) => {
        setNotifications(data);
      });
    }
  }, [authState.role]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => {
      if (prev) {
        return [...prev, notification];
      }
      return [notification];
    });
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => {
      if (prev) {
        return prev.filter((notification) => notification._id !== id);
      }
      return null;
    });
  };

  useEffect(() => {
    const handleNotification = (notification: Notification) => {
      addNotification(notification);
      console.log("new notification: ", notification);
    };
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
