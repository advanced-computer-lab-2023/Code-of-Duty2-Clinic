import {
  validateAppointmentCreation,
  findMostRecentCompletedAppointment,
  saveAppointment
} from "../..";
import FollowUpAppointmentRequestForRegistered from "../../../../models/appointments/FollowUpAppointmentRequestForRegistered";
import IFollowUpAppointmentRequestForRegisteredPatient from "../../../../models/appointments/interfaces/follow-ups/IFollowUpAppointmentRequestForRegisteredPatient";
import TimePeriod from "../../../../types/TimePeriod";
import UserRole from "../../../../types/UserRole";
import { entityIdDoesNotExistError } from "../../../../utils/ErrorMessages";
import { findDoctorById } from "../../../doctors";

export const findFollowUpRequestForRegisteredPatientById = async (
  followUpAppointmentRequestId: string
) => {
  return await FollowUpAppointmentRequestForRegistered.findById(followUpAppointmentRequestId);
};

export const getFollowUpRequestsForRegisteredPatient = async (patientId: string) => {
  const requests = await FollowUpAppointmentRequestForRegistered.find({
    patientId,
    status: "pending"
  });
  return await Promise.all(
    requests.map(async (request) => {
      const doctorId = request.doctorId.toString();
      const doctor = await findDoctorById(doctorId, "name");
      if (!doctor) throw new Error(entityIdDoesNotExistError("Doctor", doctorId));
      return {
        id: request._id,
        user: {
          id: doctorId,
          name: doctor.name
        },
        timePeriod: request.timePeriod,
        status: request.status,
        reason: request.reason
      };
    })
  );
};

export const deleteFollowUpRequestForRegisteredPatient = async (
  followUpAppointmentRequestId: string
) => {
  await FollowUpAppointmentRequestForRegistered.findByIdAndDelete(followUpAppointmentRequestId);
};

export const createFollowUpRequestForRegisteredPatient = async (
  request: IFollowUpAppointmentRequestForRegisteredPatient
) => {
  const followUpAppointmentRequest = new FollowUpAppointmentRequestForRegistered(request);
  await followUpAppointmentRequest.save();
};

export const rejectFollowUpRequestForRegisteredPatient = async (
  followUpAppointmentRequestId: string
) => {
  const followUpAppointmentRequest = await findFollowUpRequestForRegisteredPatientById(
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
  const followUpAppointmentRequest = await findFollowUpRequestForRegisteredPatientById(
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
  await validateAppointmentCreation(patientId, doctorId, startTime, endTime, UserRole.DOCTOR);

  const initialAppointment = await findMostRecentCompletedAppointment(doctorId, patientId);
  if (!initialAppointment || initialAppointment.status !== "completed") {
    throw new Error("No recent completed appointment found between the doctor and patient");
  }
  await saveAppointment(doctorId, patientId, startTime, endTime, true);
};
