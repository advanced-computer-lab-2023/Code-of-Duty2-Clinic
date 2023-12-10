import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import {
  cancelAppointmentAsDoctorForDependentPatientAndNotifyUsers,
  cancelAppointmentAsDoctorForRegisteredPatientAndNotifyUsers,
  rescheduleAppointmentAsDoctorForDependentPatientAndNotifyUsers,
  rescheduleAppointmentAsDoctorForRegisteredPatientAndNotifyUsers,
  scheduleAFollowUpAppointment,
} from "../../../services/appointments/doctors";
import {
  notifyUsersOnSystemForDependentAppointments,
  notifyUsersOnSystemForRegisteredAppointments,
} from "..";
import SocketType from "../../../types/SocketType";
import TimePeriod from "../../../types/TimePeriod";

export const scheduleFollowUpAppointmentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { startTime, endTime } = req.body;
    if (!startTime)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Start time is required" });
    if (!endTime)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "End time is required" });

    const doctorId = req.user?.id!;

    const { patientId } = req.params;
    if (!patientId)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Patient id is required" });

    await scheduleAFollowUpAppointment(doctorId, patientId, startTime, endTime);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Follow-up appointment scheduled successfully!" });
  } catch (error: any) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

export const rescheduleAppointmentForRegisteredPatientHandler = async (
  data: {
    appointmentId: string;
    timePeriod: TimePeriod;
  },
  socket: SocketType
) => {
  const { appointmentId, timePeriod } = data;
  if (!appointmentId)
    return socket
      .to(socket.id)
      .emit("error", { message: "appointmentId is required" });
  if (!timePeriod)
    return socket.to(socket.id).emit("error", {
      message: "new time period is required",
    });

  try {
    await rescheduleAppointmentAsDoctorForRegisteredPatientAndNotifyUsers(
      appointmentId,
      timePeriod
    );
    await notifyUsersOnSystemForRegisteredAppointments(appointmentId, socket);
  } catch (error: any) {
    socket.to(socket.id).emit("error", { message: error.message });
  }
};

export const rescheduleAppointmentForDependentPatientHandler = async (
  data: {
    appointmentId: string;
    timePeriod: TimePeriod;
  },
  socket: SocketType
) => {
  const { appointmentId, timePeriod } = data;
  if (!appointmentId)
    return socket
      .to(socket.id)
      .emit("error", { message: "appointmentId is required" });
  if (!timePeriod)
    return socket.to(socket.id).emit("error", {
      message: "new time period is required",
    });

  try {
    await rescheduleAppointmentAsDoctorForDependentPatientAndNotifyUsers(
      appointmentId,
      timePeriod
    );
    await notifyUsersOnSystemForDependentAppointments(appointmentId, socket);
  } catch (error: any) {
    socket.to(socket.id).emit("error", { message: error.message });
  }
};

export const cancelAppointmentForRegisteredPatientHandler = async (
  data: { appointmentId: string },
  socket: SocketType
) => {
  const { appointmentId } = data;
  if (!appointmentId)
    return socket
      .to(socket.id)
      .emit("error", { message: "appointmentId is required" });

  try {
    await cancelAppointmentAsDoctorForRegisteredPatientAndNotifyUsers(
      appointmentId
    );

    await notifyUsersOnSystemForRegisteredAppointments(appointmentId, socket);
  } catch (error: any) {
    socket.to(socket.id).emit("error", { message: error.message });
  }
};

export const cancelAppointmentForDependentPatientHandler = async (
  data: { appointmentId: string },
  socket: SocketType
) => {
  const { appointmentId } = data;
  if (!appointmentId)
    return socket
      .to(socket.id)
      .emit("error", { message: "appointmentId is required" });

  try {
    await cancelAppointmentAsDoctorForDependentPatientAndNotifyUsers(
      appointmentId
    );

    await notifyUsersOnSystemForDependentAppointments(appointmentId, socket);
  } catch (error: any) {
    socket.to(socket.id).emit("error", { message: error.message });
  }
};
