import { getAppointmentFeesWithADoctor } from "..";

import PaymentMethod from "../../../../types/PaymentMethod";

import {
  findConflictingDoctorAppointments,
  makeARefund,
  toRefundPaidFeesToPayer,
  validateCancellingAppointment,
  validateChosenTimePeriod
} from "../..";
import { performWalletTransaction } from "../../../payments/wallets/patients";
import { findDoctorById } from "../../../doctors";
import { entityIdDoesNotExistError } from "../../../../utils/ErrorMessages";
import DependentFamilyMemberAppointment from "../../../../models/appointments/DependentFamilyMemberAppointment";
import { findPatientById } from "../../../patients";
import UserRole from "../../../../types/UserRole";
import { sendEmail } from "../../../../utils/email";
import { getAppointmentNotificationText } from "../../../../utils/notificationText";
import { IDependentFamilyMemberAppointment } from "../../../../models/appointments/interfaces/IDependentFamilyMemberAppointment";

export const findDependentPatientAppointmentById = async (appointmentId: string) => {
  return await DependentFamilyMemberAppointment.findById(appointmentId);
};

export const findPatientDependentFamilyMembersAppointments = async (
  patientId?: string,
  dependentNationalId?: string,
  doctorId?: string
) => {
  const dependentFamilyMemberAppointments = await DependentFamilyMemberAppointment.aggregate([
    {
      $match: {
        ...getDependentFamilyMembersAppointmentsMatchingCondition(
          patientId,
          dependentNationalId,
          doctorId
        )
      }
    },
    {
      $lookup: {
        from: "patients",
        localField: "patientId",
        foreignField: "_id",
        as: "patient"
      }
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctor"
      }
    },
    {
      $unwind: "$patient"
    },
    {
      $unwind: "$doctor"
    },
    {
      $project: {
        _id: 1,
        patientId: 1,
        dependentNationalId: 1,
        doctorId: 1,
        timePeriod: 1,
        status: 1,
        doctor: {
          _id: 1,
          name: 1,
          specialty: 1
        }
      }
    }
  ]);
  return dependentFamilyMemberAppointments;
};

const getDependentFamilyMembersAppointmentsMatchingCondition = (
  patientId: string | undefined,
  dependentNationalId: string | undefined,
  doctorId: string | undefined
) => {
  let matchingCondition = {};
  if (patientId) matchingCondition = { ...matchingCondition, patientId };
  if (dependentNationalId) matchingCondition = { ...matchingCondition, dependentNationalId };
  if (doctorId) matchingCondition = { ...matchingCondition, doctorId };

  return matchingCondition;
};

export const bookAnAppointmentForADependentFamilyMember = async (
  payerId: string,
  dependentNationalId: string,
  doctorId: string,
  startTime: string,
  endTime: string,
  paymentMethod: PaymentMethod
) => {
  await validateAppointmentCreationForADependentFamilyMember(
    payerId,
    dependentNationalId,
    doctorId,
    startTime,
    endTime,
    UserRole.PATIENT
  );
  const appointmentFees = await getAppointmentFeesWithADoctor(payerId, doctorId);
  if (paymentMethod === PaymentMethod.WALLET) {
    await performWalletTransaction(payerId, appointmentFees);
  }
  await saveAppointmentForADependentFamilyMember(
    payerId,
    dependentNationalId,
    doctorId,
    startTime,
    endTime
  );
};

export const validateAppointmentCreationForADependentFamilyMember = async (
  payerId: string,
  dependentNationalId: string,
  doctorId: string,
  startTime: string,
  endTime: string,
  appointmentSetter: UserRole
) => {
  const selectedStartTime = new Date(startTime);
  const selectedEndTime = new Date(endTime);
  validateChosenTimePeriod(selectedStartTime, selectedEndTime);

  const doctor = await findDoctorById(doctorId);
  if (!doctor) throw new Error(entityIdDoesNotExistError("Doctor", doctorId));
  const patient = await findPatientById(payerId, {
    dependentFamilyMembers: 1
  });
  if (!patient) throw new Error(entityIdDoesNotExistError("Patient", payerId));

  if (!patient.dependentFamilyMembers || patient.dependentFamilyMembers.length === 0)
    throw new Error("Patient has no dependent family members");

  const dependentFamilyMember = patient.dependentFamilyMembers.find(
    (familyMember) => familyMember.nationalId === dependentNationalId
  );
  if (!dependentFamilyMember)
    throw new Error("Patient has no dependent family member with this national id");

  const conflictingPatientDependentAppointments =
    await findConflictingPatientDependentFamilyMemberAppointments(
      payerId,
      dependentNationalId,
      startTime,
      endTime
    );
  if (conflictingPatientDependentAppointments > 0) {
    throw new Error(
      appointmentSetter === UserRole.PATIENT
        ? "Your family member has another appointment in the requested time period"
        : "The patient is busy during the requested time period"
    );
  }

  const conflictingDoctorAppointments = await findConflictingDoctorAppointments(
    doctorId,
    startTime,
    endTime
  );
  if (conflictingDoctorAppointments > 0) {
    throw new Error(
      appointmentSetter === UserRole.PATIENT
        ? "This doctor has another appointment during the requested time period"
        : "You already have another appointment during the requested time period"
    );
  }
};

const findConflictingPatientDependentFamilyMemberAppointments = (
  payerId: string,
  dependentNationalId: string,
  startTime: string | Date,
  endTime: string | Date
) => {
  const chosenStartTime = new Date(startTime);
  const chosenEndTime = new Date(endTime);
  return DependentFamilyMemberAppointment.countDocuments({
    dependentNationalId,
    patientId: payerId,
    status: "upcoming",
    $or: [
      {
        $and: [
          { "timePeriod.startTime": { $lte: chosenStartTime } },
          { "timePeriod.endTime": { $gte: chosenStartTime } }
        ]
      },
      {
        $and: [
          { "timePeriod.startTime": { $lte: chosenEndTime } },
          { "timePeriod.endTime": { $gte: chosenEndTime } }
        ]
      }
    ]
  });
};

export const saveAppointmentForADependentFamilyMember = async (
  mainPatientId: string,
  dependentNationalId: string,
  doctorId: string,
  startTime: string,
  endTime: string,
  isAFollowUpAppointment = false
) => {
  const selectedStartTime = new Date(startTime);
  const selectedEndTime = new Date(endTime);

  const newAppointment = new DependentFamilyMemberAppointment({
    payerId: mainPatientId,
    dependentNationalId,
    doctorId,
    timePeriod: {
      startTime: selectedStartTime,
      endTime: selectedEndTime
    },
    isAFollowUp: isAFollowUpAppointment
  });
  await newAppointment.save();
};

export const rescheduleAppointmentForDependentPatientAndNotifyUsers = async (
  appointmentId: string,
  startTime: string,
  endTime: string,
  appointmentScheduler: UserRole
) => {
  const appointment = await DependentFamilyMemberAppointment.findById(appointmentId);
  if (!appointment) throw new Error("Appointment not found");
  await validateAppointmentCreationForADependentFamilyMember(
    appointment.payerId.toString(),
    appointment.dependentNationalId.toString(),
    appointment.doctorId.toString(),
    startTime,
    endTime,
    appointmentScheduler
  );
  await appointment.updateOne({
    status: "rescheduled",
    timePeriod: { startTime, endTime }
  });
  console.log(appointment);
  await notifyConcernedUsers(appointment);
};

export const cancelAppointmentForDependentAndNotifyUsers = async (
  appointmentId: string,
  cancellerRole: UserRole
) => {
  const appointment = await DependentFamilyMemberAppointment.findById(appointmentId);

  if (!appointment) throw new Error("Appointment not found");
  validateCancellingAppointment(appointment);

  if (toRefundPaidFeesToPayer(appointment, cancellerRole)) {
    await makeARefund(appointment);
  }
  appointment.status = "canceled";
  await appointment.save();

  await notifyConcernedUsers(appointment);
};

async function notifyConcernedUsers(appointment: IDependentFamilyMemberAppointment) {
  const patient = await findPatientById(appointment.payerId.toString(), "+dependentFamilyMembers");
  const dependent = patient!.dependentFamilyMembers?.find(
    (dependent) => dependent.nationalId === appointment.dependentNationalId
  );
  const doctor = await findDoctorById(appointment.doctorId.toString());

  await sendEmail({
    to: patient!.email,
    subject: `Appointment of your family members has been ${appointment.status}`,
    text: getAppointmentNotificationText(appointment, doctor!.name, true)
  });

  await sendEmail({
    to: doctor!.email,
    subject: `Your appointment has been ${appointment.status}`,
    text: getAppointmentNotificationText(appointment, dependent!.name)
  });
}
