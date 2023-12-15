import Patient, { IPatientModel } from "../../models/patients/Patient";
import { entityEmailDoesNotExistError, entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { addDays } from "../../utils/addDays";
import PaymentMethod from "../../types/PaymentMethod";
import { findHealthPackageDetailsAfterDiscount } from "../health-packages";
import { performWalletTransaction } from "../payments/wallets/patients";
import mongoose from "mongoose";
import Appointment from "../../models/appointments/Appointment";

export const findAllPatients = async () => await Patient.find();
export const findPatientById = async (id: string, elementsToSelect?: any) => {
  return await Patient.findById(id).select(elementsToSelect || { _id: 1, password: 1 });
};
export const findPatientByUsername = async (username: string, elementsToSelect?: any) =>
  await Patient.findOne({ username }).select(elementsToSelect || { _id: 1, password: 1 });

export const findPatientByEmail = async (email: string, elementsToSelect?: any) =>
  Patient.findOne({ email }).select(elementsToSelect || { _id: 1, password: 1 });

export const deletePatientById = async (id: string) => await Patient.findByIdAndDelete(id);

export const createNewPatient = async (username: string, password: string) => {
  const newPatient = new Patient({ username, password });
  await newPatient.save();
};

export const updatePatientPasswordByEmail = async (email: string, newPassword: string) => {
  const patient = await findPatientByEmail(email);
  if (!patient) {
    throw new Error(entityEmailDoesNotExistError("patient", email));
  }
  await updatePatientPassword(patient, newPassword);
};

export const updatePasswordById = async (patientId: string, newPassword: string) => {
  const patient = await findPatientById(patientId);
  if (!patient) {
    throw new Error(entityIdDoesNotExistError("patient", patientId));
  }
  await updatePatientPassword(patient, newPassword);
};

export const updatePatientPassword = async (patient: IPatientModel, newPassword: string) => {
  patient.password = newPassword;
  await patient.save();
};

export const findRegisteredFamilyMembersByID = async (id: string) => {
  const patient = await Patient.findById(id).select("+registeredFamilyMembers");

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient.registeredFamilyMembers;
};
export const subscribeToHealthPackageService = async (
  payingPatientId: string,
  paidPatientId: string,
  packageId: string,
  paymentMethod: PaymentMethod
) => {
  const patient = await Patient.findById(paidPatientId).select("+subscribedPackage");
  if (!patient) throw new Error("Patient not found");
  const healthPackage = await findHealthPackageDetailsAfterDiscount(paidPatientId, packageId);
  if (!healthPackage) throw new Error("Health package not found");
  const today = new Date();

  if (paymentMethod === PaymentMethod.WALLET) {
    await performWalletTransaction(payingPatientId, healthPackage.amountToPay);
  }
  patient.subscribedPackage = {
    packageId: healthPackage.id,
    startDate: today,
    endDate: addDays(today, healthPackage.packageDurationInYears * 365),
    status: "subscribed"
  };

  await patient.save();

  return { success: true, message: "Subscription successful" };
};

export async function setSubscribedPackageForDependentService(
  patientId: string,
  dependentNid: string,
  packageId: string,
  paymentMethod: PaymentMethod
) {
  const patient = await Patient.findById(patientId).select("+dependentFamilyMembers");

  if (!patient) throw new Error("Patient not found");
  const healthPackage = await findHealthPackageDetailsAfterDiscount(patientId, packageId);

  if (!healthPackage) throw new Error("Health package not found");

  const today = new Date();

  if (!patient.dependentFamilyMembers) throw new Error("Dependent family members not found");

  const dependent = patient.dependentFamilyMembers.find(
    (dependentFamilyMember) => dependentFamilyMember.nationalId === dependentNid
  );

  if (!dependent) throw new Error("Dependent not found");

  if (paymentMethod === PaymentMethod.WALLET) {
    await performWalletTransaction(patientId, healthPackage.amountToPay);
  }

  dependent.subscribedPackage = {
    packageId: healthPackage.id,
    startDate: today,
    endDate: addDays(today, healthPackage.packageDurationInYears * 365),
    status: "subscribed"
  };

  await patient.save();
}

export const viewSubscribedPackageForDependentService = async (
  patientId: string,
  dependentNid: string
) => {
  // Find the patient by ID
  const patient = await Patient.findById(patientId).select("+dependentFamilyMembers");
  if (patient) {
    const dependent = patient.dependentFamilyMembers?.find(
      (dependentFamilyMembers) => dependentFamilyMembers.nationalId === dependentNid
    );

    if (dependent) {
      // Access the subscribed package details for the dependent
      const subscribedPackage = dependent.subscribedPackage;
      if (!subscribedPackage) {
        throw new Error("Dependent family member has no subscribed package");
      }
      return subscribedPackage;
    }
  }
};

export const viewHealthCarePackageStatusService = async (patientId: string) => {
  // Find the patient by ID
  const patient = await Patient.findById(patientId).select("+subscribedPackage");
  if (!patient) {
    throw new Error("Patient not found");
  }

  const subscribedPackage = patient.subscribedPackage;

  if (!subscribedPackage) {
    throw new Error("Patient has no subscribed package");
  }
  const subscriptionStatus = {
    status: subscribedPackage.status,
    renewalDate: subscribedPackage.startDate,
    endDate: subscribedPackage.endDate
  };

  return subscriptionStatus;
};

export const viewHealthCarePackageStatusForDependentService = async (
  patientId: string,
  dependentNid: string
) => {
  const patient = await Patient.findById(patientId).select("+dependentFamilyMembers");
  if (!patient) {
    throw new Error("Patient not found");
  }
  if (!patient.dependentFamilyMembers) {
    throw new Error("Dependent family members not found");
  }

  const dependent = patient.dependentFamilyMembers.find(
    (dependentFamilyMember) => dependentFamilyMember.nationalId === dependentNid
  );

  if (!dependent) {
    throw new Error("Dependent family member not found");
  }
  const subscriptionStatus = {
    status: dependent.subscribedPackage?.status,
    renewalDate: dependent.subscribedPackage?.startDate,
    endDate: dependent.subscribedPackage?.endDate
  };
  return subscriptionStatus;
};

export const viewSubscribedHealthPackageService = async (patientId: string) => {
  const patient = await Patient.findById(patientId).select("+subscribedPackage");

  if (!patient) {
    throw new Error("Patient not found");
  }
  const subscribedHealthPackage = patient.subscribedPackage;

  if (!subscribedHealthPackage) {
    throw new Error("Patient has no subscribed package");
  }

  return subscribedHealthPackage;
};

export const viewSubscribedHealthPackageBenefitsService = async (patientId: string) => {
  const patient = await Patient.findById(patientId).select("+subscribedPackage");

  if (!patient) {
    throw new Error("Patient not found");
  }
  const subscribedHealthPackage = HealthPackage.findById(patient.subscribedPackage?.packageId);

  if (!subscribedHealthPackage) {
    throw new Error("Patient has no subscribed package");
  }

  return subscribedHealthPackage;
};

export const cancelSubscriptionService = async (patientId: string) => {
  const patient = await Patient.findById(patientId).select("+subscribedPackage");

  if (!patient) {
    throw new Error("Patient not found");
  }

  if (!patient.subscribedPackage) {
    throw new Error("Patient has no subscribed package");
  }
  patient.subscribedPackage.status = "cancelled";
  patient.subscribedPackage.endDate = new Date();
  await patient.save();
};

export const cancelSubscribedForDependentService = async (
  patientId: string,
  dependentNid: string
) => {
  const patient = await Patient.findById(patientId).select("+dependentFamilyMembers");

  if (!patient) {
    throw new Error("Patient not found");
  }

  if (!patient.dependentFamilyMembers) {
    throw new Error("Dependent family members not found");
  }

  const dependent = patient.dependentFamilyMembers.find(
    (dependentFamilyMembers) => dependentFamilyMembers.nationalId === dependentNid
  );

  if (!dependent) {
    throw new Error("Dependent family member not found");
  }

  if (dependent.subscribedPackage) {
    dependent.subscribedPackage.status = "cancelled";
    dependent.subscribedPackage.endDate = new Date();
  }
  await patient.save();
};
export const viewDependentFamilyMembersService = async (patientId: string) => {
  const patient = await Patient.findById(patientId).select("+dependentFamilyMembers");
  if (!patient) {
    throw new Error("Patient not found");
  }
  if (!patient.dependentFamilyMembers) {
    throw new Error("Dependent family members not found");
  }
  return patient.dependentFamilyMembers;
};
export const viewSubscribedHealthPackageAllDetailsServiceR = async (patientId: string) => {
  const patient = await Patient.findById(patientId).select("+subscribedPackage");
  const subscribedPackage = patient?.subscribedPackage;
  const healthPackage = await HealthPackage.findById(patient?.subscribedPackage?.packageId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  if (!healthPackage) {
    throw new Error("Health package not found");
  }
  return {
    subscribedPackage,
    healthPackage
  };
};

export const viewSubscribedHealthPackageAllDetailsServiceD = async (
  patientId: string,
  patientNId: string
) => {
  const patient = await Patient.findById(patientId).select("+dependentFamilyMembers");
  if (!patient) {
    throw new Error("Patient not found");
  }
  if (!patient.dependentFamilyMembers) {
    throw new Error("Dependent family members not found");
  }

  const dependent = patient.dependentFamilyMembers.find(
    (dependentFamilyMember) => dependentFamilyMember.nationalId.toString() === patientNId
  );
  if (!dependent) {
    throw new Error("Dependent family member not found");
  }

  const subscribedPackage = dependent?.subscribedPackage!;
  const healthPackage = await HealthPackage.findById(dependent?.subscribedPackage?.packageId);

  return {
    subscribedPackage,
    healthPackage
  };
};

export const getPatientDoctors = async (patientId: string, doctorName: string) => {
  const patient = await findPatientById(patientId);
  if (!patient) throw new Error(entityIdDoesNotExistError("patient", patientId));

  const doctors = await Appointment.aggregate([
    {
      $match: {
        patientId: new mongoose.Types.ObjectId(patientId),
        status: "completed"
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
      $match: {
        ["doctor.name"]: { $regex: `^${doctorName}`, $options: "i" }
      }
    },
    { $unwind: "$doctor" },
    {
      $group: {
        _id: "$doctor._id",
        name: { $first: "$doctor.name" },
        email: { $first: "$doctor.email" },
        imageUrl: { $first: "$doctor.imageUrl" }
      }
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: 1,
        gender: 1,
        imageUrl: 1
      }
    }
  ]);
  return doctors;
};
