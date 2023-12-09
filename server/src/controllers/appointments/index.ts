import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { findPatientById } from "../../services/patients";
import { getPatientAppointments } from "../../services/appointments/patients";
import { datacatalog } from "googleapis/build/src/apis/datacatalog";
import Appointment from "../../models/appointments/Appointment";
import SocketType from "../../types/SocketType";

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

export const rescheduleAppointmentHandler = async (
  socket: SocketType,
  data: {
    appointmentId: string;
    newTime: {
      startTime: string;
      endTime: string;
    };
  }
) => {
  const patientId = socket.handshake.auth.user.id;
  const appointmentId = data.appointmentId;
  const newTime = data.newTime;

  if (!patientId || !appointmentId || !newTime) {
    return socket.emit("reschedule_appointment_error", {
      message:
        "patientId, appointmentId, appointmentTime and isTimeSet are required",
    });
  }

  try {
    const patient = await findPatientById(patientId);
    if (!patient) {
      return socket.emit("reschedule_appointment_error", {
        message: entityIdDoesNotExistError("Patient", patientId),
      });
    }

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patientId,
    });
    if (!appointment) {
      return socket.emit("reschedule_appointment_error", {
        message: entityIdDoesNotExistError("Appointment", appointmentId),
      });
    }

    if (appointment.status !== "upcoming") {
      return socket.emit("reschedule_appointment_error", {
        message: "Appointment cannot be rescheduled",
      });
    }

    const updatedAppointment = {};

    socket.emit("reschedule_appointment_success", updatedAppointment);
  } catch (error: any) {
    socket.emit("reschedule_appointment_error", { message: error.message });
  }
};
