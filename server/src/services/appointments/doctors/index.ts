import { findDoctorById } from "../../doctors";
import Appointment from "../../../models/appointments/Appointment";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import {
  findMostRecentCompletedAppointment,
  getAppointments,
  makeARefund,
  saveAppointment,
  validateCancellingAppointment,
} from "..";
import { validateAppointmentCreation } from "..";
import UserRole from "../../../types/UserRole";
import { findPatientById } from "../../patients";
import { rechargePatientWallet } from "../../payments/wallets/patients";
import { getAppointmentFeesWithADoctor } from "../patients";

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

export const cancelAppointmentAsDoctor = async (appointmentId: string) => {
  const appointment = await Appointment.findById({ _id: appointmentId });
  if (!appointment) throw new Error("Appointment not found");
  validateCancellingAppointment(appointment);

  await makeARefund(appointment);
  appointment.status = "canceled";
  await appointment.save();
};
