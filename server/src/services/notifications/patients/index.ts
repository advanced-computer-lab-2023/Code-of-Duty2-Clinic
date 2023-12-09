import { markNotificationAsRead, storeNotification } from "../common";
import NotificationTitleDescription from "../../../types/NotificationTitleDescription";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { findPatientById } from "../../patients";

export const storeNotificationSentToPatient = async (
  patientId: string,
  notification: NotificationTitleDescription
) => {
  const patient = await findPatientById(patientId);
  if (!patient) {
    throw new Error(entityIdDoesNotExistError("Patient", patientId));
  }
  await storeNotification(patient, notification);
};

export const markNotificationAsReadForPatient = async (
  patientId: string,
  notificationId: string
) => {
  const patient = await findPatientById(patientId);
  if (!patient) {
    throw new Error(entityIdDoesNotExistError("Patient", patientId));
  }
  await markNotificationAsRead(patient, notificationId);
};

export const getAllNotificationsForPatient = async (patientId: string) => {
  const patient = await findPatientById(patientId);
  if (!patient) {
    throw new Error(entityIdDoesNotExistError("Patient", patientId));
  }
  return patient.receivedNotifications || [];
};
