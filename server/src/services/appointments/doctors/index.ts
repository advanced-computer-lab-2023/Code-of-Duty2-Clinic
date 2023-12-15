import { findDoctorById } from "../../doctors";
import Appointment from "../../../models/appointments/Appointment";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import {
  cancelAppointmentForRegisteredPatientAndNotifyUsers as cancelAppointmentForRegisteredPatientAndNotifyUsers,
  findMostRecentCompletedAppointment,
  getAppointments,
  rescheduleAppointmentForRegisteredPatientAndNotifyUsers,
  saveAppointment,
  validateAppointmentCreation,
} from "..";
import UserRole from "../../../types/UserRole";
import {
  cancelAppointmentForDependentAndNotifyUsers,
  rescheduleAppointmentForDependentPatientAndNotifyUsers,
} from "../patients/dependent-family-members";
import TimePeriod from "../../../types/TimePeriod";
import DependentFamilyMemberAppointment from "../../../models/appointments/DependentFamilyMemberAppointment";
import { findPatientById } from "../../patients";

export const findAppointmentDetailsForDoctor = async (
  doctorId: string,
  appointmentId: string
) => {
  const doctor = await findDoctorById(doctorId);

  if (!doctor) throw new Error(entityIdDoesNotExistError("Doctor", doctorId));

  const appointment: any = await Appointment.findById(appointmentId)?.populate({
    path: "patientId",
    select: {
      _id: 1,
      patientId: 1,
      timePeriod: 1,
      status: 1,
      name: 1,
      mobileNumber: 1,
      email: 1,
      gender: 1,
    },
  });

  if (!appointment)
    throw new Error(entityIdDoesNotExistError("Appointment", appointmentId));

  return getAppointmentRequiredFieldsForDoctor(appointment);
};

const getAppointmentRequiredFieldsForDoctor = (appointment: any) => ({
  appointmentId: appointment._id,
  patient: {
    id: appointment.patientId._id,
    name: appointment.patientId.name,
    mobileNumber: appointment.patientId.mobileNumber,
    email: appointment.patientId.email,
    gender: appointment.patientId.gender,
    age: appointment.patientId.age,
  },
  timePeriod: appointment.timePeriod,
  status: appointment.status,
});

export const getDoctorAppointments = async (userId: string, urlQuery: any) => {
  const registeredPatientsAppointments = await getAppointments(
    false,
    userId,
    urlQuery
  );
  const dependentPatientsAppointments =
    await getDoctorAppointmentsForDependentPatients(userId, urlQuery);
  return registeredPatientsAppointments.concat(dependentPatientsAppointments);
};

const getDoctorAppointmentsForDependentPatients = async (
  doctorId: string,
  query: {
    status: "completed" | "upcoming" | "canceled" | "rescheduled";
    targetName: string;
  }
) => {
  const existingDependentPatientsAppointments =
    await DependentFamilyMemberAppointment.find({
      doctorId: doctorId,
      status: query.status || { $in: ["rescheduled", "upcoming"] },
    });

  const result = [];
  for (const appointment of existingDependentPatientsAppointments) {
    const patient = await findPatientById(
      appointment.payerId.toString(),
      "+dependentFamilyMembers"
    );

    if (!patient)
      throw new Error(
        entityIdDoesNotExistError("Patient", appointment.payerId.toString())
      );

    if (!patient.dependentFamilyMembers) {
      continue;
    }
    const dependentMember = patient.dependentFamilyMembers.find(
      (member) =>
        member.nationalId === appointment.dependentNationalId.toString()
    )!;
    if (
      query.targetName &&
      !dependentMember.name
        .toLowerCase()
        .startsWith(query.targetName.toLowerCase())
    ) {
      continue;
    }
    result.push({
      appointmentId: appointment._id,
      user: {
        name: dependentMember.name,
        id: dependentMember.nationalId,
      },
      timePeriod: appointment.timePeriod,
      status: appointment.status,
      isForDependent: true,
    });
  }
  return result;
};

export const scheduleAFollowUpAppointment = async (
  doctorId: string,
  patientId: string,
  startTime: string,
  endTime: string
) => {
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

export const rescheduleAppointmentAsDoctorForRegisteredPatientAndNotifyUsers =
  async (appointmentId: string, timePeriod: TimePeriod) => {
    await rescheduleAppointmentForRegisteredPatientAndNotifyUsers(
      appointmentId,
      timePeriod.startTime.toString(),
      timePeriod.endTime.toString(),
      UserRole.DOCTOR
    );
  };

export const rescheduleAppointmentAsDoctorForDependentPatientAndNotifyUsers =
  async (appointmentId: string, timePeriod: TimePeriod) => {
    await rescheduleAppointmentForDependentPatientAndNotifyUsers(
      appointmentId,
      timePeriod.startTime.toString(),
      timePeriod.endTime.toString(),
      UserRole.DOCTOR
    );
  };

export const cancelAppointmentAsDoctorForRegisteredPatientAndNotifyUsers =
  async (appointmentId: string) => {
    await cancelAppointmentForRegisteredPatientAndNotifyUsers(
      appointmentId,
      UserRole.DOCTOR
    );
  };

export const cancelAppointmentAsDoctorForDependentPatientAndNotifyUsers =
  async (appointmentId: string) => {
    await cancelAppointmentForDependentAndNotifyUsers(
      appointmentId,
      UserRole.DOCTOR
    );
  };
