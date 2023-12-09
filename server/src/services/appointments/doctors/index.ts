import { findDoctorById } from "../../doctors";
import Appointment from "../../../models/appointments/Appointment";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import {
  cancelAppointmentForRegisteredPatient,
  findMostRecentCompletedAppointment,
  getAppointments,
  saveAppointment,
} from "..";
import { validateAppointmentCreation } from "..";
import UserRole from "../../../types/UserRole";
import { cancelAppointmentForDependent } from "../patients/dependent-family-members";

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

export const getDoctorAppointments = async (userId: string, urlQuery: any) =>
  await getAppointments(false, userId, urlQuery);

export const cancelAppointmentAsDoctorForRegisteredPatient = async (
  appointmentId: string
) => {
  await cancelAppointmentForRegisteredPatient(appointmentId, UserRole.DOCTOR);
};

export const cancelAppointmentAsDoctorForDependentPatient = async (
  appointmentId: string
) => {
  await cancelAppointmentForDependent(appointmentId, UserRole.DOCTOR);
};
