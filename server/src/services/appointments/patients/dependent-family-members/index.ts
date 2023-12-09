import { getAppointmentFeesWithADoctor } from "..";

import PaymentMethod from "../../../../types/PaymentMethod";

import {
  findConflictingDoctorAppointments,
  validateChosenTimePeriod,
} from "../..";
import { performWalletTransaction } from "../../../payments/wallets/patients";
import { findDoctorById } from "../../../doctors";
import { entityIdDoesNotExistError } from "../../../../utils/ErrorMessages";
import DependentFamilyMemberAppointment from "../../../../models/appointments/DependentFamilyMemberAppointment";
import { findPatientById } from "../../../patients";

export const findPatientDependentFamilyMembersAppointments = async (
  patientId?: string,
  dependentNationalId?: string,
  doctorId?: string
) => {
  const dependentFamilyMemberAppointments =
    await DependentFamilyMemberAppointment.aggregate([
      {
        $match: {
          ...getDependentFamilyMembersAppointmentsMatchingCondition(
            patientId,
            dependentNationalId,
            doctorId
          ),
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patient",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $unwind: "$patient",
      },
      {
        $unwind: "$doctor",
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
            specialty: 1,
          },
        },
      },
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
  if (dependentNationalId)
    matchingCondition = { ...matchingCondition, dependentNationalId };
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
    endTime
  );
  const appointmentFees = await getAppointmentFeesWithADoctor(
    payerId,
    doctorId
  );
  if (paymentMethod === PaymentMethod.WALLET) {
    await performWalletTransaction(payerId, appointmentFees);
  }
  await scheduleAppointmentForADependentFamilyMember(
    payerId,
    dependentNationalId,
    doctorId,
    startTime,
    endTime
  );
};

const validateAppointmentCreationForADependentFamilyMember = async (
  payerId: string,
  dependentNationalId: string,
  doctorId: string,
  startTime: string,
  endTime: string
) => {
  const selectedStartTime = new Date(startTime);
  const selectedEndTime = new Date(endTime);
  validateChosenTimePeriod(selectedStartTime, selectedEndTime);

  const doctor = await findDoctorById(doctorId);
  if (!doctor) throw new Error(entityIdDoesNotExistError("Doctor", doctorId));
  const patient = await findPatientById(payerId, {
    dependentFamilyMembers: 1,
  });
  if (!patient) throw new Error(entityIdDoesNotExistError("Patient", payerId));

  if (
    !patient.dependentFamilyMembers ||
    patient.dependentFamilyMembers.length === 0
  )
    throw new Error("Patient has no dependent family members");

  const dependentFamilyMember = patient.dependentFamilyMembers.find(
    (familyMember) => familyMember.nationalId === dependentNationalId
  );
  if (!dependentFamilyMember)
    throw new Error(
      "Patient has no dependent family member with this national id"
    );

  const conflictingPatientDependentAppointments =
    await findConflictingPatientDependentFamilyMemberAppointments(
      payerId,
      dependentNationalId,
      startTime,
      endTime
    );
  if (conflictingPatientDependentAppointments > 0) {
    throw new Error(
      "Your family member has another appointment in the requested time period"
    );
  }

  const conflictingDoctorAppointments = await findConflictingDoctorAppointments(
    doctorId,
    startTime,
    endTime
  );
  if (conflictingDoctorAppointments > 0) {
    throw new Error(
      "This doctor has another appointment during the requested time period"
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

const scheduleAppointmentForADependentFamilyMember = async (
  payerId: string,
  dependentNationalId: string,
  doctorId: string,
  startTime: string,
  endTime: string
) => {
  const selectedStartTime = new Date(startTime);
  const selectedEndTime = new Date(endTime);

  validateChosenTimePeriod(selectedStartTime, selectedEndTime);

  const newAppointment = new DependentFamilyMemberAppointment({
    payerId,
    dependentNationalId,
    doctorId,
    timePeriod: {
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    },
  });
  await newAppointment.save();
};
