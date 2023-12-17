import DependentFamilyMemberAppointment from "../../../../models/appointments/DependentFamilyMemberAppointment";
import FollowUpAppointmentRequestForDependentPatient from "../../../../models/appointments/FollowUpAppointmentRequestForDependentPatient";
import IFollowUpAppointmentRequestForDependentPatient from "../../../../models/appointments/interfaces/follow-ups/IFollowUpAppointmentRequestForDependentPatient";
import TimePeriod from "../../../../types/TimePeriod";
import UserRole from "../../../../types/UserRole";
import { entityIdDoesNotExistError } from "../../../../utils/ErrorMessages";
import { sendEmail } from "../../../../utils/email";
import { findDoctorById } from "../../../doctors";
import { storeNotificationSentToDoctor } from "../../../notifications/doctors";
import { storeNotificationSentToPatient } from "../../../notifications/patients";
import { findPatientById } from "../../../patients";
import {
  saveAppointmentForADependentFamilyMember,
  validateAppointmentCreationForADependentFamilyMember
} from "../../patients/dependent-family-members";

export const findFollowUpRequestForDependentPatientById = async (
  followUpAppointmentRequestId: string
) => {
  const result = await FollowUpAppointmentRequestForDependentPatient.findById(
    followUpAppointmentRequestId
  );
  result!.patientType = "dependent";
  return result;
};

export const getFollowUpRequestsForDependentPatient = async (patientId: string) => {
  const requests = await FollowUpAppointmentRequestForDependentPatient.find({
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

export const deleteFollowUpRequestForDependentPatient = async (
  followUpAppointmentRequestId: string
) => {
  await FollowUpAppointmentRequestForDependentPatient.findByIdAndDelete(
    followUpAppointmentRequestId
  );
};

export const createFollowUpRequestForDependentPatient = async (
  request: IFollowUpAppointmentRequestForDependentPatient
) => {
  const followUpAppointmentRequest = new FollowUpAppointmentRequestForDependentPatient(request);
  await followUpAppointmentRequest.save();
};

export const rejectFollowUpRequestForDependentPatient = async (
  followUpAppointmentRequestId: string
) => {
  const followUpAppointmentRequest = await findFollowUpRequestForDependentPatientById(
    followUpAppointmentRequestId
  );
  if (!followUpAppointmentRequest) {
    throw new Error("Follow up appointment request not found");
  }
  followUpAppointmentRequest.status = "rejected";
  await followUpAppointmentRequest.save();
};

export const acceptFollowUpRequestForDependentPatient = async (
  followUpAppointmentRequestId: string,
  appointmentTimePeriod: TimePeriod | undefined
) => {
  const followUpAppointmentRequest = await findFollowUpRequestForDependentPatientById(
    followUpAppointmentRequestId
  );
  if (!followUpAppointmentRequest) {
    throw new Error("Follow up appointment request not found");
  }
  await scheduleAFollowUpAppointmentForDependent(
    followUpAppointmentRequest.patientId.toString(),
    followUpAppointmentRequest.dependentNationalId,
    followUpAppointmentRequest.doctorId.toString(),
    (followUpAppointmentRequest.timePeriod || appointmentTimePeriod)!
  );
  followUpAppointmentRequest.status = "accepted";
  await followUpAppointmentRequest.save();
};

export const scheduleAFollowUpAppointmentForDependent = async (
  mainPatientId: string,
  dependentNationalId: string,
  doctorId: string,
  timePeriod: TimePeriod
) => {
  const startTime = timePeriod.startTime.toString();
  const endTime = timePeriod.endTime.toString();
  await validateAppointmentCreationForADependentFamilyMember(
    mainPatientId,
    dependentNationalId,
    doctorId,
    startTime,
    endTime,
    UserRole.DOCTOR
  );

  const initialAppointment = await findMostRecentCompletedAppointmentForDependent(
    doctorId,
    mainPatientId,
    dependentNationalId
  );
  if (!initialAppointment || initialAppointment.status !== "completed") {
    throw new Error(
      "No recent completed appointment found between the doctor and dependent patient"
    );
  }
  await saveAppointmentForADependentFamilyMember(
    mainPatientId,
    dependentNationalId,
    doctorId,
    startTime,
    endTime,
    true
  );

  const patient = await findPatientById(
    mainPatientId,
    "name email receivedNotifications dependentFamilyMembers"
  );
  const doctor = await findDoctorById(doctorId, "name email receivedNotifications");
  const dependent = patient?.dependentFamilyMembers?.find(
    (dependent) => dependent.nationalId === dependentNationalId
  );

  await sendEmail({
    to: patient!.email,
    subject: `Follow-up appointment scheduled`,
    text: `Your family member ${dependent!.name} follow-up appointment with Dr. ${
      doctor!.name
    } has been scheduled from ${startTime} to ${endTime}`
  });
  await sendEmail({
    to: doctor!.email,
    subject: `Follow-up appointment scheduled`,
    text: `Your follow-up appointment with ${
      dependent!.name
    } has been scheduled from ${startTime} to ${endTime}`
  });

  await storeNotificationSentToPatient(patient!, {
    subject: "Follow-up appointment scheduled",
    description: `Your family member ${dependent!.name} follow-up appointment with Dr. ${
      doctor!.name
    } has been scheduled from ${startTime} to ${endTime}`
  });
  await storeNotificationSentToDoctor(doctor!, {
    subject: "Follow-up appointment scheduled",
    description: `Your follow-up appointment with ${
      dependent!.name
    } has been scheduled from ${startTime} to ${endTime}`
  });
};

const findMostRecentCompletedAppointmentForDependent = async (
  doctorId: string,
  payerId: string,
  dependentNationalId: string
) => {
  return DependentFamilyMemberAppointment.findOne({
    doctorId,
    payerId,
    dependentNationalId,
    status: "completed"
  });
};
