import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import {
  bookAnAppointmentForADependentFamilyMember,
  findPatientDependentFamilyMembersAppointments
} from "../../../services/appointments/patients/dependent-family-members";
import { StatusCodes } from "http-status-codes";
import PaymentMethod from "../../../types/PaymentMethod";
import {
  bookAnAppointment,
  cancelAppointmentAsPatientForDependentPatientAndNotifyUsers,
  cancelAppointmentAsPatientForRegisteredPatientAndNotifyUsers,
  getAppointmentFeesWithADoctor,
  getPatientAppointments,
  rescheduleAppointmentAsPatientForDependentPatientAndNotifyUsers,
  rescheduleAppointmentAsPatientForRegisteredPatientAndNotifyUsers
} from "../../../services/appointments/patients";
import SocketType from "../../../types/SocketType";
import TimePeriod from "../../../types/TimePeriod";
import { findPatientById } from "../../../services/patients";
import {
  notifyUsersOnSystemForDependentAppointments,
  notifyUsersOnSystemForRegisteredAppointments
} from "..";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { getDoctorAppointments } from "../../../services/appointments/doctors";

export const bookAnAppointmentHandler = async (req: AuthorizedRequest, res: Response) => {
  const patientId = req.user?.id!;
  const doctorId = req.params.doctorId;
  if (!doctorId)
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "doctorId is required" });

  const { startTime, endTime } = req.body;
  if (!startTime || !endTime)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "startTime and endTime are required" });

  const paymentMethod =
    req.query.paymentMethod === "wallet" ? PaymentMethod.WALLET : PaymentMethod.CREDIT_CARD;
  try {
    await bookAnAppointment(patientId, patientId, doctorId, startTime, endTime, paymentMethod);
    res.status(StatusCodes.CREATED).send({ message: "Appointment booked" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const bookAnAppointmentForARegisteredFamilyMemberHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const { familyMemberId, doctorId } = req.params;
  if (!familyMemberId)
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "familyMemberId is required" });
  if (!doctorId)
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "doctorId is required" });

  const { startTime, endTime } = req.body;
  if (!startTime || !endTime)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "startTime and endTime are required" });

  const paymentMethod =
    req.query.paymentMethod === "wallet" ? PaymentMethod.WALLET : PaymentMethod.CREDIT_CARD;

  try {
    await bookAnAppointment(
      patientId,
      familyMemberId as string,
      doctorId,
      startTime,
      endTime,
      paymentMethod
    );
    res.status(StatusCodes.CREATED).send({ message: "Appointment booked" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const bookAnAppointmentForADependentFamilyMemberHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const { dependentNationalId, doctorId } = req.params;
  if (!dependentNationalId)
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "dependentNationalId is required" });
  if (!doctorId)
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "doctorId is required" });

  const { startTime, endTime } = req.body;
  if (!startTime || !endTime)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "startTime and endTime are required" });

  const paymentMethod =
    req.query.paymentMethod === "wallet" ? PaymentMethod.WALLET : PaymentMethod.CREDIT_CARD;
  try {
    await bookAnAppointmentForADependentFamilyMember(
      patientId,
      dependentNationalId as string,
      doctorId,
      startTime,
      endTime,
      paymentMethod
    );
    res.status(StatusCodes.CREATED).send({ message: "Appointment booked" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const getDoctorAppointmentFeesHandler = async (req: AuthorizedRequest, res: Response) => {
  const patientId = req.user?.id!;
  const doctorId = req.params.doctorId;
  if (!doctorId)
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "doctorId is required" });

  try {
    const fees = await getAppointmentFeesWithADoctor(patientId, doctorId);
    res.status(StatusCodes.OK).send({ fees });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
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
  if (!appointmentId) return socket.emit("error", { message: "appointmentId is required" });
  if (!timePeriod)
    return socket.emit("error", {
      message: "new time period is required"
    });

  try {
    await rescheduleAppointmentAsPatientForRegisteredPatientAndNotifyUsers(
      appointmentId,
      timePeriod
    );
    await notifyUsersOnSystemForRegisteredAppointments(appointmentId, socket);
  } catch (error: any) {
    socket.emit("error", { message: error.message });
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
  if (!appointmentId) return socket.emit("error", { message: "appointmentId is required" });
  if (!timePeriod)
    return socket.emit("error", {
      message: "new time period is required"
    });

  try {
    await rescheduleAppointmentAsPatientForDependentPatientAndNotifyUsers(
      appointmentId,
      timePeriod
    );
    await notifyUsersOnSystemForDependentAppointments(appointmentId, socket);
  } catch (error: any) {
    socket.emit("error", { message: error.message });
  }
};

export const cancelAppointmentForRegisteredPatientHandler = async (
  data: { appointmentId: string },
  socket: SocketType
) => {
  const { appointmentId } = data;
  if (!appointmentId) return socket.emit("error", { message: "appointmentId is required" });

  try {
    await cancelAppointmentAsPatientForRegisteredPatientAndNotifyUsers(appointmentId);

    await notifyUsersOnSystemForRegisteredAppointments(appointmentId, socket);
  } catch (error: any) {
    socket.emit("error", { message: error.message });
  }
};

export const cancelAppointmentForDependentPatientHandler = async (
  data: { appointmentId: string },
  socket: SocketType
) => {
  const { appointmentId } = data;
  if (!appointmentId) return socket.emit("error", { message: "appointmentId is required" });

  try {
    await cancelAppointmentAsPatientForDependentPatientAndNotifyUsers(appointmentId);

    await notifyUsersOnSystemForDependentAppointments(appointmentId, socket);
  } catch (error: any) {
    socket.emit("error", { message: error.message });
  }
};
export const getAppointmentsWithAllDoctors = async (req: AuthorizedRequest, res: Response) => {
  const patientId = req.query.registeredPatientId || req.user?.id;
  if (!patientId)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "patientId is required" });

  const allowedQueryParameters = [
    "status",
    "appointmentTime",
    "isTimeSet",
    "targetName",
    "registeredPatientId"
  ];

  if (
    Object.keys(req.query).length > allowedQueryParameters.length ||
    Object.keys(req.query).some((key) => !allowedQueryParameters.includes(key))
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("only doctorName, appointment status or time slot must be provided");
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
    const patient = await findPatientById(patientId as string);
    if (!patient)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: entityIdDoesNotExistError("Patient", patientId as string) });

    const appointments = await getPatientAppointments(patientId as string, req.query);
    res.status(StatusCodes.OK).json(appointments);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getAllAppointmentsForDependentPatientHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const supervisingPatientId = req.user?.id;
  const dependentNationalId = req.params.dependentNationalId;
  if (!dependentNationalId)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "dependentNationalId is required" });

  try {
    const appointments = await findPatientDependentFamilyMembersAppointments(
      supervisingPatientId!,
      dependentNationalId
    );
    res.status(StatusCodes.OK).json(appointments);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const getAllDoctorAppointmentsTimings = async (req: AuthorizedRequest, res: Response) => {
  const patientId = req.user?.id;
  const doctorId = req.params.doctorId;
  if (!doctorId)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "doctorId is required" });

  try {
    const appointments = await getDoctorAppointments(doctorId, {});
    const timings = appointments.map((appointment) => ({
      startTime: appointment.timePeriod.startTime,
      endTime: appointment.timePeriod.endTime
    }));
    res.status(StatusCodes.OK).json(timings);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};
