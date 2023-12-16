import { markNotificationAsRead, storeNotification } from "../common";
import NotificationSubjectDescription from "../../../types/NotificationSubjectDescription";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { findDoctorById } from "../../doctors";
import { IDoctorModel } from "../../../models/doctors/Doctor";

export const storeNotificationSentToDoctor = async (
  doctor: IDoctorModel,
  notification: NotificationSubjectDescription
) => {
  return await storeNotification(doctor, notification);
};

export const markNotificationAsReadForDoctor = async (doctorId: string, notificationId: string) => {
  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("Doctor", doctorId));
  }
  await markNotificationAsRead(doctor, notificationId);
};

export const getAllNotificationsForDoctor = async (doctorId: string) => {
  const doctor = await findDoctorById(doctorId, "receivedNotifications");
  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("Doctor", doctorId));
  }
  return doctor.receivedNotifications || [];
};
