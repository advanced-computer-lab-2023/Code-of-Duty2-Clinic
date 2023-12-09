import { storeNotificationSentToUser } from "../../services/notifications";
import NotificationTitleDescription from "../../types/NotificationTitleDescription";
import { User } from "../../types/User";
import SocketType from "../../types/SocketType";

const addSocketEventListeners = (socket: SocketType) => {
  const user = socket.handshake.auth as User;
  socket.on("appointment_cancellation", (data) => {
    const message = "Notification based on event1";
    // storeNotification(userId, message);
    socket.to(user.id).emit("notification_message", { message });
  });

  socket.on("appointment_rescheduling", (data) => {
    const notificationMessage: NotificationTitleDescription = {
      title: "Appointment Rescheduled",
      description: "Notification based on event2",
    };
    storeNotificationSentToUser(user, notificationMessage);
    socket.to(user.id).emit("notification_message", {
      message: notificationMessage,
    });
  });

  socket.on("event2", (data) => {
    const message = "Notification based on event2";
    // storeNotification(userId, message);
    socket.to(user.id).emit("notification2", { message });
  });
};

export default addSocketEventListeners;
