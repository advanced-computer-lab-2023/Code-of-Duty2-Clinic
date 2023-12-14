import mongoose from "mongoose";
import Appointment, {
  IAppointmentModel,
} from "../../models/appointments/Appointment";
import { getRequestedTimePeriod } from "../../utils/getRequestedTimePeriod";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { findDoctorById } from "../doctors";
import { findPatientById } from "../patients";
import UserRole from "../../types/UserRole";
import { IRegisteredPatientAppointment } from "../../models/appointments/interfaces/IRegisteredPatientAppointment";
import { rechargePatientWallet } from "../payments/wallets/patients";
import { getAppointmentFeesWithADoctor } from "./patients";
import { IAppointmentBaseInfo } from "../../models/appointments/interfaces/IAppointmentBaseInfo";
import { IDependentFamilyMemberAppointment } from "../../models/appointments/interfaces/IDependentFamilyMemberAppointment";
import { sendEmail } from "../../utils/email";
import { getAppointmentNotificationText } from "../../utils/notificationText";

export const findAppointmentById = async (id: string) =>
  await Appointment.findById(id);

export const getAppointments = async (
  isPatient: boolean,
  userId: string,
  urlQuery: any
) => {
  const emptyQuery = Object.keys(urlQuery).length === 0;
  const searchQuery = emptyQuery
    ? getDefaultAppointmentFilters()
    : getMatchingAppointmentsFields(urlQuery);

  const user = isPatient ? "patientId" : "doctorId";
  return await Appointment.aggregate([
    { $match: { [user]: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: isPatient ? "doctors" : "patients",
        localField: isPatient ? "doctorId" : "patientId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $match: { ...searchQuery } },
    { $unwind: "$user" },
    {
      $project: {
        appointmentId: "$_id",
        _id: 0,
        status: 1,
        timePeriod: 1,
        user: {
          id: "$user._id",
          name: "$user.name",
          imageUrl: "$user.imageUrl",
        },
      },
    },
  ]);
};

export function getDefaultAppointmentFilters(): {
  status?: { $in: string[] };
  "timePeriod.startTime"?: { $gte: Date };
} {
  return {
    status: { $in: ["upcoming", "rescheduled"] },
    "timePeriod.startTime": { $gte: new Date() },
  };
}

function getMatchingAppointmentsFields(urlQuery: any) {
  const { appointmentTime, status, name } = urlQuery;
  const isTimeSet = urlQuery.isTimeSet === "true";

  let searchQuery: {
    status?: string;
    "user.name"?: { $regex: string; $options: string };
    "timePeriod.startTime"?: any;
    "timePeriod.endTime"?: any;
  } = {};

  if (status && status !== "") {
    searchQuery.status = status;
  }
  if (name && name != "") {
    searchQuery["user.name"] = { $regex: `^${name}`, $options: "i" };
  }

  if (appointmentTime && appointmentTime !== "") {
    const { requestedStartTime, requestedEndTime } = getRequestedTimePeriod(
      appointmentTime,
      isTimeSet
    );
    searchQuery["timePeriod.startTime"] = { $lte: requestedStartTime };
    searchQuery["timePeriod.endTime"] = { $gte: requestedEndTime };
  }
  return searchQuery;
}

export const saveAppointment = async (
  patientId: string,
  doctorId: string,
  startTime: string | Date,
  endTime: string | Date,
  isAFollowUpAppointment: boolean = false,
  payerId?: string
) => {
  const selectedStartTime = new Date(startTime);
  const selectedEndTime = new Date(endTime);

  const appointment: IAppointmentModel = new Appointment({
    timePeriod: { startTime: selectedStartTime, endTime: selectedEndTime },
    status: "upcoming",
    doctorId,
    patientId,
    isAFollowUp: isAFollowUpAppointment,
    payerId,
  });
  return await appointment.save();
};

export const findMostRecentCompletedAppointment = async (
  doctorId: string,
  patientId: string
) => {
  return Appointment.findOne({
    doctorId,
    patientId,
    status: "completed",
  }).sort({ "timePeriod.endTime": -1 });
};

export async function validateAppointmentCreation(
  patientId: string,
  doctorId: string,
  startTime: string,
  endTime: string,
  requestingUser: UserRole
) {
  const selectedStartTime = new Date(startTime);
  const selectedEndTime = new Date(endTime);

  validateChosenTimePeriod(selectedStartTime, selectedEndTime);

  const doctor = await findDoctorById(doctorId);
  if (!doctor) throw new Error(entityIdDoesNotExistError("Doctor", doctorId));

  const patient = await findPatientById(patientId);
  if (!patient)
    throw new Error(entityIdDoesNotExistError("Patient", patientId));

  const conflictingPatientAppointments =
    await findConflictingPatientAppointments(patientId, startTime, endTime);

  if (conflictingPatientAppointments > 0) {
    throw new Error(
      requestingUser === UserRole.DOCTOR
        ? "The patient is busy during the requested time period"
        : "You already have another appointment during the requested time period"
    );
  }

  const conflictingDoctorAppointments = await findConflictingDoctorAppointments(
    doctorId,
    startTime,
    endTime
  );
  if (conflictingDoctorAppointments > 0) {
    throw new Error(
      requestingUser === UserRole.PATIENT
        ? "You already have another appointment during the requested time period"
        : "This doctor has another appointment during the requested time period"
    );
  }
}

export function validateChosenTimePeriod(
  selectedStartTime: Date,
  selectedEndTime: Date
) {
  if (selectedStartTime >= selectedEndTime)
    throw new Error("Start time cannot be greater or equal to end time");
  if (selectedStartTime < new Date())
    throw new Error("Start time cannot be in the past");
  if (selectedEndTime < new Date())
    throw new Error("End time cannot be in the past");
}

export const findConflictingPatientAppointments = async (
  patientId: string,
  startTime: string | Date,
  endTime: string | Date
) => {
  const chosenStartTime = new Date(startTime);
  const chosenEndTime = new Date(endTime);
  return await Appointment.countDocuments({
    patientId,
    status: "upcoming",
    $or: [
      {
        $and: [
          { "timePeriod.startTime": { $lte: chosenStartTime } },
          { "timePeriod.endTime": { $gte: chosenStartTime } },
        ],
      },
      {
        $and: [
          { "timePeriod.startTime": { $lte: chosenEndTime } },
          { "timePeriod.endTime": { $gte: chosenEndTime } },
        ],
      },
    ],
  });
};

export const findConflictingDoctorAppointments = async (
  doctorId: string,
  startTime: string | Date,
  endTime: string | Date
) => {
  const chosenStartTime = new Date(startTime);
  const chosenEndTime = new Date(endTime);
  return await Appointment.countDocuments({
    doctorId,
    status: "upcoming",
    $or: [
      {
        $and: [
          { "timePeriod.startTime": { $lte: chosenStartTime } },
          { "timePeriod.endTime": { $gte: chosenStartTime } },
        ],
      },
      {
        $and: [
          { "timePeriod.startTime": { $lte: chosenEndTime } },
          { "timePeriod.endTime": { $gte: chosenEndTime } },
        ],
      },
    ],
  });
};

export const rescheduleAppointmentForRegisteredPatientAndNotifyUsers = async (
  appointmentId: string,
  startTime: string,
  endTime: string,
  appointmentScheduler: UserRole
) => {
  const appointment = await findAppointmentById(appointmentId);
  if (!appointment) throw new Error("Appointment not found");
  await validateAppointmentCreation(
    appointment.patientId.toString(),
    appointment.doctorId.toString(),
    startTime,
    endTime,
    appointmentScheduler
  );
  await appointment.updateOne({
    timePeriod: { startTime, endTime },
  });

  await notifyConcernedUsers(appointment);
};

export const cancelAppointmentForRegisteredPatientAndNotifyUsers = async (
  appointmentId: string,
  cancellerRole: UserRole
) => {
  const appointment = await findAppointmentById(appointmentId);

  if (!appointment) throw new Error("Appointment not found");
  validateCancellingAppointment(appointment);

  if (toRefundPaidFeesToPayer(appointment, cancellerRole)) {
    await makeARefund(appointment);
  }
  appointment.status = "canceled";
  await appointment.save();

  await notifyConcernedUsers(appointment);
};

async function notifyConcernedUsers(
  appointment: IRegisteredPatientAppointment
) {
  const patient = await findPatientById(appointment.patientId.toString());
  const doctor = await findDoctorById(appointment.doctorId.toString());

  await sendEmail({
    to: patient!.email,
    subject: `Your appointment has been ${appointment.status}`,
    text: getAppointmentNotificationText(appointment, doctor!.name),
  });

  await sendEmail({
    to: doctor!.email,
    subject: `Your appointment has been ${appointment.status}`,
    text: getAppointmentNotificationText(appointment, patient!.name),
  });
}

export function toRefundPaidFeesToPayer(
  appointment:
    | IRegisteredPatientAppointment
    | IDependentFamilyMemberAppointment,
  cancellerRole: UserRole
) {
  return (
    !appointment.isAFollowUp &&
    (cancellerRole === UserRole.DOCTOR ||
      (cancellerRole === UserRole.PATIENT &&
        willAppointmentStartAfterADay(appointment)))
  );
}

const ENTIRE_DAY_TIME = 24 * 60 * 60 * 1000;
function willAppointmentStartAfterADay(appointment: IAppointmentBaseInfo) {
  return (
    appointment.timePeriod.startTime.getTime() - new Date().getTime() >
    ENTIRE_DAY_TIME
  );
}

export async function makeARefund(
  appointment: IRegisteredPatientAppointment | IDependentFamilyMemberAppointment
) {
  const payerId = appointment.payerId.toString();
  const refund = await getAppointmentFeesWithADoctor(
    payerId,
    appointment.doctorId.toString()
  );
  if (!refund) throw new Error("Error Calculating Refund");
  await rechargePatientWallet(payerId.toString(), refund);
}

export function validateCancellingAppointment(
  appointment: IRegisteredPatientAppointment | IDependentFamilyMemberAppointment
) {
  if (appointment.status === "completed") {
    throw new Error("Appointment already completed");
  }
  if (appointment.status === "canceled") {
    throw new Error("Appointment already cancelled");
  }
}
