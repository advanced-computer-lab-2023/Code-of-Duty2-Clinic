import { findPatientById } from "../../services/patients";
import SocketType from "../../types/SocketType";
import { findAppointmentById } from "../../services/appointments";
import { findDoctorById } from "../../services/doctors";
import { getAppointmentNotificationText } from "../../utils/notificationText";
import { findDependentPatientAppointmentById } from "../../services/appointments/patients/dependent-family-members";
import { storeNotificationSentToPatient } from "../../services/notifications/patients";
import { storeNotificationSentToDoctor } from "../../services/notifications/doctors";
import NotificationSubjectDescription from "../../types/NotificationSubjectDescription";
import { getSocketIdForUserId } from "../../socket-connections";

export async function notifyUsersOnSystemForDependentAppointments(
  appointmentId: string,
  socket: SocketType
) {
  const appointment = await findDependentPatientAppointmentById(appointmentId);
  const mainPatientId = appointment!.payerId.toString();
  const patient = await findPatientById(mainPatientId);
  const doctorId = appointment!.doctorId.toString();
  const doctor = await findDoctorById(doctorId);

  const notificationSentToPatient: NotificationSubjectDescription = {
    subject: `Appointment of your family members has been ${appointment?.status}`,
    description: getAppointmentNotificationText(appointment!, doctor!.name),
  };
  let createdNotification = await storeNotificationSentToPatient(
    patient!,
    notificationSentToPatient
  );
  socket.to(mainPatientId).emit(`appointment_${appointment?.status}`, {
    message: createdNotification,
  });

  const notificationSentToDoctor: NotificationSubjectDescription = {
    subject: `Your appointment has been ${appointment?.status}`,
    description: getAppointmentNotificationText(appointment!, patient!.name),
  };
  createdNotification = await storeNotificationSentToDoctor(
    doctor!,
    notificationSentToDoctor
  );
  socket.to(doctorId).emit(`appointment_${appointment?.status}`, {
    message: createdNotification,
  });
}

export async function notifyUsersOnSystemForRegisteredAppointments(
  appointmentId: string,
  socket: SocketType
) {
  const appointment = await findAppointmentById(appointmentId);
  const patientId = appointment!.patientId.toString();
  const patient = await findPatientById(patientId);
  const doctorId = appointment!.doctorId.toString();
  const doctor = await findDoctorById(doctorId);

  const notificationSentToPatient: NotificationSubjectDescription = {
    subject: `Your appointment has been ${appointment?.status}`,
    description: getAppointmentNotificationText(appointment!, doctor!.name),
  };
  let createdNotification = await storeNotificationSentToPatient(
    patient!,
    notificationSentToPatient
  );
  socket
    .to(getSocketIdForUserId(patientId))
    .emit(`appointment_${appointment?.status}`, {
      message: createdNotification,
    });

  const notificationSentToDoctor: NotificationSubjectDescription = {
    subject: `Your appointment has been ${appointment?.status}`,
    description: getAppointmentNotificationText(appointment!, patient!.name),
  };
  createdNotification = await storeNotificationSentToDoctor(
    doctor!,
    notificationSentToDoctor
  );
  socket
    .to(getSocketIdForUserId(doctorId))
    .emit(`appointment_${appointment?.status}`, {
      message: createdNotification,
    });
}
