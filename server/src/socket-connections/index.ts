import { storeNotificationSentToUser as saveNotificationSentToUser } from "../services/notifications";
import NotificationSubjectDescription from "../types/NotificationSubjectDescription";
import { User } from "../types/User";
import SocketType from "../types/SocketType";

const addSocketEventListeners = (socket: SocketType) => {
  const user = socket.handshake.auth as User;

  socket.on("appointment_rescheduling", (data) => {
    const notificationMessage: NotificationSubjectDescription = {
      subject: "Appointment Rescheduled",
      description: "Notification sent",
    };
    saveNotificationSentToUser(user, notificationMessage);
    socket.to(user.id).emit("notification_message", {
      message: notificationMessage,
    });
  });

  socket.on("appointment_cancellation", (data) => {
    const notificationMessage: NotificationSubjectDescription = {
      subject: "Appointment Rescheduled",
      description: "Notification sent",
    };
    saveNotificationSentToUser(user, notificationMessage);
    socket.to(user.id).emit("notification2", { message: notificationMessage });
  });
};

export default addSocketEventListeners;
