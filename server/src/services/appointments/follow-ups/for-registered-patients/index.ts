import {
  validateAppointmentCreation,
  findMostRecentCompletedAppointment,
  saveAppointment,
} from "../..";
import FollowUpAppointmentRequestForRegistered from "../../../../models/appointments/FollowUpAppointmentRequestForRegistered";
import IFollowUpAppointmentRequestForRegisteredPatient from "../../../../models/appointments/interfaces/follow-ups/IFollowUpAppointmentRequestForRegisteredPatient";
import TimePeriod from "../../../../types/TimePeriod";
import UserRole from "../../../../types/UserRole";

export const findFollowUpRequestForRegisteredPatientById = async (
  followUpAppointmentRequestId: string
) => {
  return await FollowUpAppointmentRequestForRegistered.findById(
    followUpAppointmentRequestId
  );
};

export const getFollowUpRequestsForRegisteredPatient = async (
  patientId: string
) => {
  return await FollowUpAppointmentRequestForRegistered.find({
    patientId,
  });
};

export const createFollowUpRequestForRegisteredPatient = async (
  request: IFollowUpAppointmentRequestForRegisteredPatient
) => {
  const followUpAppointmentRequest =
    new FollowUpAppointmentRequestForRegistered(request);
  await followUpAppointmentRequest.save();
};

export const rejectFollowUpRequestForRegisteredPatient = async (
  followUpAppointmentRequestId: string
) => {
  const followUpAppointmentRequest =
    await findFollowUpRequestForRegisteredPatientById(
      followUpAppointmentRequestId
    );
  if (!followUpAppointmentRequest) {
    throw new Error("Follow up appointment request not found");
  }
  followUpAppointmentRequest.status = "rejected";
  await followUpAppointmentRequest.save();
};

export const acceptFollowUpRequestForRegisteredPatient = async (
  followUpAppointmentRequestId: string,
  appointmentTimePeriod?: TimePeriod
) => {
  const followUpAppointmentRequest =
    await findFollowUpRequestForRegisteredPatientById(
      followUpAppointmentRequestId
    );
  if (!followUpAppointmentRequest) {
    throw new Error("Follow up appointment request not found");
  }
  await scheduleAFollowUpAppointment(
    followUpAppointmentRequest.doctorId.toString(),
    followUpAppointmentRequest.patientId.toString(),
    (followUpAppointmentRequest.timePeriod || appointmentTimePeriod)!
  );
  followUpAppointmentRequest.status = "accepted";
  await followUpAppointmentRequest.save();
};

const scheduleAFollowUpAppointment = async (
  doctorId: string,
  patientId: string,
  timePeriod: TimePeriod
) => {
  const startTime = timePeriod.startTime.toString();
  const endTime = timePeriod.endTime.toString();
  await validateAppointmentCreation(
    patientId,
    doctorId,
    startTime,
    endTime,
    UserRole.DOCTOR
  );

  const initialAppointment = await findMostRecentCompletedAppointment(
    doctorId,
    patientId
  );
  if (!initialAppointment || initialAppointment.status !== "completed") {
    throw new Error(
      "No recent completed appointment found between the doctor and patient"
    );
  }
  await saveAppointment(doctorId, patientId, startTime, endTime, true);
};
