import {
  getAppointments,
  scheduleAppointment,
  validateAppointmentCreation,
} from "..";
import { getClinicCommission } from "../../../models/clinic/Clinic";
import { IPatient } from "../../../models/patients/interfaces/IPatient";
import PaymentMethod from "../../../types/PaymentMethod";
import UserRole from "../../../types/UserRole";
import { findDoctorById } from "../../doctors";
import { findHealthPackageById } from "../../health-packages";
import { findPatientById } from "../../patients";
import { performWalletTransaction } from "../../payments/wallets/patients";

export const getPatientAppointments = async (userId: string, urlQuery: any) =>
  await getAppointments(true, userId, urlQuery);

export const bookAnAppointment = async (
  bookerPatientId: string,
  appointedPatientId: string,
  doctorId: string,
  startTime: string,
  endTime: string,
  paymentMethod: PaymentMethod
) => {
  await validateAppointmentCreation(
    appointedPatientId,
    doctorId,
    startTime,
    endTime,
    UserRole.PATIENT
  );
  const appointmentFees = await getAppointmentFeesWithADoctor(
    appointedPatientId,
    doctorId
  );
  if (paymentMethod === PaymentMethod.WALLET) {
    await performWalletTransaction(bookerPatientId, appointmentFees);
  }
  await scheduleAppointment(appointedPatientId, doctorId, startTime, endTime);
};

export const getAppointmentFeesWithADoctor = async (
  patientId: string,
  doctorId: string
) => {
  const patient = await findPatientById(patientId, { subscribedPackage: 1 });
  if (!patient) throw new Error("Patient not found");
  const doctorSessionDiscount = await getDoctorSessionDiscount(patient);
  const doctorSessionPrice = await getDoctorSessionPrice(doctorId);
  return doctorSessionPrice - doctorSessionDiscount * doctorSessionPrice;
};

const getDoctorSessionDiscount = async (patient: IPatient) => {
  if (
    !patient.subscribedPackage ||
    patient.subscribedPackage.status !== "subscribed"
  ) {
    return 0;
  }
  const subscribedHealthPackage = await findHealthPackageById(
    patient.subscribedPackage.packageId.toString()
  );
  if (!subscribedHealthPackage)
    throw new Error("Subscribed health package not found");
  return subscribedHealthPackage.discounts.gainedDoctorSessionDiscount;
};

const getDoctorSessionPrice = async (doctorId: string) => {
  const doctor = await findDoctorById(doctorId, { hourlyRate: 1 });
  if (!doctor) throw new Error("Doctor not found");
  return doctor.hourlyRate + doctor.hourlyRate * (await getClinicCommission());
};
