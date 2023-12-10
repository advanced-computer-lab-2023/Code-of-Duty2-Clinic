import { IAdminModel } from "../../models/admins/Admin";
import { IDoctorModel } from "../../models/doctors/Doctor";
import { INotification } from "../../models/notifications/interfaces/INotification";
import { IPatientModel } from "../../models/patients/Patient";
import NotificationSubjectDescription from "../../types/NotificationSubjectDescription";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";

export const storeNotification = async (
  user: IAdminModel | IPatientModel | IDoctorModel,
  notificationSubjectDescription: NotificationSubjectDescription
) => {
  const notification = {
    ...notificationSubjectDescription,
    time: new Date(),
  } as INotification;
  if (!user.receivedNotifications) user.receivedNotifications = [];
  notification.time = new Date();
  user.receivedNotifications.push(notification);
  await user.save();
};

export const markNotificationAsRead = async (
  user: IAdminModel | IPatientModel | IDoctorModel,
  notificationId: string
) => {
  const notification = user.receivedNotifications?.find(
    (notification) => notification._id?.toString() === notificationId
  );
  if (!notification) {
    throw new Error(entityIdDoesNotExistError("Notification", notificationId));
  }
  notification.isRead = true;
  await user.save();
};
