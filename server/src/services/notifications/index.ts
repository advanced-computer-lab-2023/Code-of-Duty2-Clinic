import NotificationTitleDescription from "../../types/NotificationTitleDescription";
import { User } from "../../types/User";
import UserRole from "../../types/UserRole";
import { storeNotificationSentToAdmin } from "./admins";
import { storeNotificationSentToDoctor } from "./doctors";
import { storeNotificationSentToPatient } from "./patients";

export const storeNotificationSentToUser = async (
  userInfo: User,
  notification: NotificationTitleDescription
) => {
  switch (userInfo.role) {
    case UserRole.ADMIN:
      await storeNotificationSentToAdmin(userInfo.id, notification);
      break;
    case UserRole.DOCTOR:
      await storeNotificationSentToDoctor(userInfo.id, notification);
      break;
    case UserRole.PATIENT:
      await storeNotificationSentToPatient(userInfo.id, notification);
      break;
    default:
      break;
  }
};
