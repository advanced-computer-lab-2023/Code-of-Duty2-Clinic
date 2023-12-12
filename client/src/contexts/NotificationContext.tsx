import { createContext, useState } from "react";
import { Notification } from "../types";

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
  removeNotification: () => {},
});

type ProviderProps = {
  children: React.ReactNode;
};
const NotificationContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );
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

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
