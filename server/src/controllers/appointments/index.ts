import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { findPatientById } from "../../services/patients";
import { getPatientAppointments } from "../../services/appointments/patients";
import SocketType from "../../types/SocketType";
import { findAppointmentById } from "../../services/appointments";
import { findDoctorById } from "../../services/doctors";
import { getAppointmentNotificationText } from "../../utils/notificationText";
import { findDependentPatientAppointmentById } from "../../services/appointments/patients/dependent-family-members";
import { storeNotificationSentToPatient } from "../../services/notifications/patients";
import { storeNotificationSentToDoctor } from "../../services/notifications/doctors";
import NotificationSubjectDescription from "../../types/NotificationSubjectDescription";

export const getAppointmentsWithAllDoctors = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id;
  if (!patientId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "patientId is required" });

  const allowedQueryParameters = [
    "status",
    "appointmentTime",
    "isTimeSet",
    "targetName",
  ];

  if (
    Object.keys(req.query).length > allowedQueryParameters.length ||
    Object.keys(req.query).some((key) => !allowedQueryParameters.includes(key))
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        "only doctorName, appointment status or time slot must be provided"
      );
  }

  if (
    (req.query.appointmentTime && !req.query.isTimeSet) ||
    (req.query.isTimeSet && !req.query.appointmentTime)
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("isTimeSet and appointmentTime must be provided together");
  }

  try {
    const patient = await findPatientById(patientId);
    if (!patient)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: entityIdDoesNotExistError("Patient", patientId) });

    const appointments = await getPatientAppointments(patientId, req.query);
    res.status(StatusCodes.OK).json(appointments);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

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
  socket.to(mainPatientId).emit(`appointment_${appointment?.status}`, {
    message: notificationSentToPatient,
  });
  await storeNotificationSentToPatient(patient!, notificationSentToPatient);

  const notificationSentToDoctor: NotificationSubjectDescription = {
    subject: `Your appointment has been ${appointment?.status}`,
    description: getAppointmentNotificationText(appointment!, patient!.name),
  };
  socket.to(doctorId).emit(`appointment_${appointment?.status}`, {
    message: notificationSentToDoctor,
  });
  await storeNotificationSentToDoctor(doctor!, notificationSentToDoctor);
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
  socket.to(patientId).emit(`appointment_${appointment?.status}`, {
    message: notificationSentToPatient,
  });
  await storeNotificationSentToPatient(patient!, notificationSentToPatient);

  const notificationSentToDoctor: NotificationSubjectDescription = {
    subject: `Your appointment has been ${appointment?.status}`,
    description: getAppointmentNotificationText(appointment!, patient!.name),
  };
  socket.to(doctorId).emit(`appointment_${appointment?.status}`, {
    message: notificationSentToDoctor,
  });
  await storeNotificationSentToDoctor(doctor!, notificationSentToDoctor);
}
