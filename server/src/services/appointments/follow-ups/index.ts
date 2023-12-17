import { Types } from "mongoose";
import FollowUpAppointmentRequestForDependentPatient from "../../../models/appointments/FollowUpAppointmentRequestForDependentPatient";
import FollowUpAppointmentRequestForRegistered from "../../../models/appointments/FollowUpAppointmentRequestForRegistered";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { findPatientById } from "../../patients";

type FollowUpRequest = {
  id: Types.ObjectId;
  user: {
    id: string;
    name: string;
  };
  status: "accepted" | "rejected" | "pending";
  timePeriod?: {
    startTime: Date | string;
    endTime: Date | string;
  };
  reason?: string;
  isFromDependentPatient?: boolean;
};

export const getFollowUpRequestsForDoctor = async (
  doctorId: string,
  status?: string
): Promise<FollowUpRequest[]> => {
  const dependentPatientsRequests = await getAllFollowUpRequestsForDependentPatients(
    doctorId,
    status
  );
  const registeredPatientsRequests = await getAllFollowUpRequestsForRegisteredPatients(
    doctorId,
    status
  );

  return dependentPatientsRequests.concat(registeredPatientsRequests as any[]);
};

const getAllFollowUpRequestsForDependentPatients = async (
  doctorId: string,
  status?: string
): Promise<FollowUpRequest[]> => {
  const dependentPatientsRequests = await FollowUpAppointmentRequestForDependentPatient.find({
    doctorId
  }).find(status ? { status } : {});

  return await Promise.all(
    dependentPatientsRequests.map(async (request) => {
      const id = request._id;

      const supervisingPatientId = request.patientId.toString();
      const supervisingPatient = await findPatientById(
        supervisingPatientId,
        "dependentFamilyMembers"
      );

      if (!supervisingPatient)
        throw new Error(entityIdDoesNotExistError("Patient", supervisingPatientId));

      if (!supervisingPatient.dependentFamilyMembers)
        throw new Error("Patient does not have any dependent family members");

      const dependentPatient = supervisingPatient.dependentFamilyMembers.find(
        (dependentPatient) => dependentPatient.nationalId === request.patientId.toString()
      );

      if (!dependentPatient) throw new Error("Dependent patient does not exist");

      return {
        id: request._id,
        user: {
          id: dependentPatient.nationalId,
          name: dependentPatient.name
        },
        status: request.status,
        timePeriod: request.timePeriod,
        reason: request.reason,
        isFromDependentPatient: true
      };
    })
  );
};

const getAllFollowUpRequestsForRegisteredPatients = async (
  doctorId: string,
  status?: string
): Promise<FollowUpRequest[]> => {
  const registeredPatientsRequests = await FollowUpAppointmentRequestForRegistered.find({
    doctorId
  }).find(status ? { status } : {});

  return await Promise.all(
    registeredPatientsRequests.map(async (request) => {
      const id = request._id;

      const patientId = request.patientId.toString();
      const patient = await findPatientById(patientId);

      if (!patient) throw new Error(entityIdDoesNotExistError("Patient", patientId));

      return {
        id: request._id,
        user: {
          id: patientId,
          name: patient.name
        },
        status: request.status,
        timePeriod: request.timePeriod,
        reason: request.reason
      };
    })
  );
};
