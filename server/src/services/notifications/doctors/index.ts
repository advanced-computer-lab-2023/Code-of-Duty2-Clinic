import { markNotificationAsRead, storeNotification } from "../common";
import NotificationTitleDescription from "../../../types/NotificationTitleDescription";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { findDoctorById } from "../../doctors";

export const storeNotificationSentToDoctor = async (
  doctorId: string,
  notification: NotificationTitleDescription
) => {
  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("Doctor", doctorId));
  }
  await storeNotification(doctor, notification);
};

export const markNotificationAsReadForDoctor = async (
  doctorId: string,
  notificationId: string
) => {
  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("Doctor", doctorId));
  }
  await markNotificationAsRead(doctor, notificationId);
};

export const getAllNotificationsForDoctor = async (doctorId: string) => {
  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("Doctor", doctorId));
  }
  return doctor.receivedNotifications || [];
};
