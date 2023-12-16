import { markNotificationAsRead, storeNotification } from "../common";
import NotificationSubjectDescription from "../../../types/NotificationSubjectDescription";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { findAdminById } from "../../admins";

export const storeNotificationSentToAdmin = async (
  adminId: string,
  notification: NotificationSubjectDescription
) => {
  const admin = await findAdminById(adminId);
  if (!admin) {
    throw new Error(entityIdDoesNotExistError("Admin", adminId));
  }
  await storeNotification(admin, notification);
};

export const markNotificationAsReadForAdmin = async (
  adminId: string,
  notificationId: string
) => {
  const admin = await findAdminById(adminId);
  if (!admin) {
    throw new Error(entityIdDoesNotExistError("Admin", adminId));
  }
  await markNotificationAsRead(admin, notificationId);
};

export const getAllNotificationsForAdmin = async (adminId: string) => {
  const admin = await findAdminById(adminId);
  if (!admin) {
    throw new Error(entityIdDoesNotExistError("Admin", adminId));
  }
  return admin.receivedNotifications || [];
};
