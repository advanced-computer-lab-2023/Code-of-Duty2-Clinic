import { markNotificationAsRead, storeNotification } from "../common";
import NotificationSubjectDescription from "../../../types/NotificationSubjectDescription";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { findPatientById } from "../../patients";
import { IPatientModel } from "../../../models/patients/Patient";

export const storeNotificationSentToPatient = async (
  patient: IPatientModel,
  notification: NotificationSubjectDescription
) => {
  return await storeNotification(patient, notification);
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
  const patient = await findPatientById(patientId, "receivedNotifications");
  if (!patient) {
    throw new Error(entityIdDoesNotExistError("Patient", patientId));
  }
  return patient.receivedNotifications || [];
};
