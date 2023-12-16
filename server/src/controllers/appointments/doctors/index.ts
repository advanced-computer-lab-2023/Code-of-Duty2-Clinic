import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import {
  cancelAppointmentAsDoctorForDependentPatientAndNotifyUsers,
  cancelAppointmentAsDoctorForRegisteredPatientAndNotifyUsers,
  rescheduleAppointmentAsDoctorForDependentPatientAndNotifyUsers,
  rescheduleAppointmentAsDoctorForRegisteredPatientAndNotifyUsers,
  scheduleAFollowUpAppointment
} from "../../../services/appointments/doctors";
import {
  notifyUsersOnSystemForDependentAppointments,
  notifyUsersOnSystemForRegisteredAppointments
} from "..";
import SocketType from "../../../types/SocketType";
import TimePeriod from "../../../types/TimePeriod";

export const scheduleFollowUpAppointmentHandler = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { startTime, endTime } = req.body;
    if (!startTime)
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Start time is required" });
    if (!endTime)
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "End time is required" });

    const doctorId = req.user?.id!;

    const { patientId } = req.params;
    if (!patientId)
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Patient id is required" });

    await scheduleAFollowUpAppointment(doctorId, patientId, startTime, endTime);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Follow-up appointment scheduled successfully!" });
  } catch (error: any) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
};

export const rescheduleAppointmentForPatientHandler = async (
  data: {
    appointmentId: string;
    timePeriod: TimePeriod;
    appointedPatientType: "registered" | "dependent";
  },
  socket: SocketType
) => {
  const { appointmentId, timePeriod } = data;
  if (!appointmentId) return socket.emit("error", { message: "appointmentId is required" });
  if (!timePeriod)
    return socket.emit("error", {
      message: "new time period is required"
    });

  try {
    if (data.appointedPatientType === "registered") {
      await rescheduleAppointmentAsDoctorForRegisteredPatientAndNotifyUsers(
        appointmentId,
        timePeriod
      );
      await notifyUsersOnSystemForRegisteredAppointments(appointmentId, socket);
    } else if (data.appointedPatientType === "dependent") {
      await rescheduleAppointmentAsDoctorForDependentPatientAndNotifyUsers(
        appointmentId,
        timePeriod
      );
      await notifyUsersOnSystemForDependentAppointments(appointmentId, socket);
    } else {
      throw new Error("Patient type is not valid");
    }
  } catch (error: any) {
    console.error(error);
    socket.emit("error", { message: error.message });
  }
};

export const cancelAppointmentForPatientHandler = async (
  data: {
    appointmentId: string;
    appointedPatientType: "registered" | "dependent";
  },
  socket: SocketType
) => {
  const { appointmentId } = data;
  if (!appointmentId) return socket.emit("error", { message: "appointmentId is required" });

  try {
    if (data.appointedPatientType === "registered") {
      await cancelAppointmentAsDoctorForRegisteredPatientAndNotifyUsers(appointmentId);

      await notifyUsersOnSystemForRegisteredAppointments(appointmentId, socket);
    } else if (data.appointedPatientType === "dependent") {
      await cancelAppointmentAsDoctorForDependentPatientAndNotifyUsers(appointmentId);

      await notifyUsersOnSystemForDependentAppointments(appointmentId, socket);
    } else {
      throw new Error("Patient type is not valid");
    }
  } catch (error: any) {
    socket.emit("error", { message: error.message });
  }
};
