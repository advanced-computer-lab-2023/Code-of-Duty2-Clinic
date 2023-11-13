import Patient, { IPatientModel } from "../../models/patients/Patient";
import {
  entityEmailDoesNotExistError,
  entityIdDoesNotExistError,
} from "../../utils/ErrorMessages";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { ISubscribedPackage } from "../../models/patients/interfaces/ISubscribedPackage";
import { addDays } from "../../utils/addDays";

export const findAllPatients = async () => await Patient.find();
export const healthPackageOptionsService = async () =>
  await HealthPackage.find();

export const findPatientById = async (id: string, elementsToSelect?: any) => {
  const PromisedPatient = Patient.findById(id);
  if (!elementsToSelect)
    return await PromisedPatient.select({ _id: 1, password: 1 });
  return await PromisedPatient.select(elementsToSelect);
};
export const findPatientByUsername = async (username: string) =>
  await Patient.findOne({ username }).select({ _id: 1, password: 1 });

export const findPatientByEmail = async (
  email: string,
  elementsToSelect?: any
) => {
  const PromisedPatient = Patient.findOne({ email });
  if (!elementsToSelect)
    return await PromisedPatient.select({ _id: 1, password: 1 });
  return await PromisedPatient.select(elementsToSelect);
};
export const deletePatientById = async (id: string) =>
  await Patient.findByIdAndDelete(id);

export const createNewPatient = async (username: string, password: string) => {
  const newPatient = new Patient({ username, password });
  await newPatient.save();
};

export const updatePatientPasswordByEmail = async (
  email: string,
  newPassword: string
) => {
  const patient = await findPatientByEmail(email);
  if (!patient) {
    throw new Error(entityEmailDoesNotExistError("patient", email));
  }
  await updatePatientPassword(patient, newPassword);
};

export const updatePasswordById = async (
  patientId: string,
  newPassword: string
) => {
  const patient = await findPatientById(patientId);
  if (!patient) {
    throw new Error(entityIdDoesNotExistError("patient", patientId));
  }
  await updatePatientPassword(patient, newPassword);
};

export const updatePatientPassword = async (
  patient: IPatientModel,
  newPassword: string
) => {
  patient.password = newPassword;
  await patient.save();
};

export const subscribeToHealthPackageService = async (
  patientId: string,
  packageId: string
) => {
  try {
    const patient = await Patient.findById(patientId).select('+subscribedPackage');
    const healthPackage = await HealthPackage.findById(packageId);
    const today = new Date();

    if (!patient || !healthPackage) {
      throw new Error("Patient or HealthPackage not found");
    }

    patient.subscribedPackage = {
      packageId: healthPackage._id,
      startDate: today,
      endDate: addDays(today, healthPackage.packageDurationInYears * 365),
      status: "subscribed",
    };

    await patient.save();

    return { success: true, message: "Subscription successful" };
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Subscription failed");
  }
};

export async function setSubscribedPackageForDependentService(
  patientId: string,
  dependentNid: string,
  packageId: string,
  
) {
  try {
    // Find the patient by patientId
    const patient = await Patient.findById(patientId).select('+dependentFamilyMembers');
    const healthPackage = await HealthPackage.findById(packageId);
    const today = new Date();

    if (!patient || !healthPackage) {
      throw new Error("Patient or HealthPackage not found");
    } else if (patient.dependentFamilyMembers) {
      const dependent = patient.dependentFamilyMembers.find(
        (dependentFamilyMember) =>
          dependentFamilyMember.nationalId === dependentNid
      );

      if (dependent) {
        // Set the subscribed package for the dependent family member
        dependent.subscribedPackage = {
          packageId: healthPackage._id,
          startDate: today,
          endDate: addDays(today, healthPackage.packageDurationInYears * 365),
          status: "subscribed",
        };

        // Save the changes
        await patient.save();
      } else {
        throw new Error("Dependent not found");
      }
    } else {
      throw new Error("Dependent family members not found");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // You may want to throw the error again or handle it in a specific way.
  }
}

export const viewSubscribedPackageForDependentService = async (
  patientId: string,
  dependentNid: string
) => {
  // Find the patient by ID
  const patient = await Patient.findById(patientId).select('+dependentFamilyMembers');
  if (patient) {
    const dependent = patient.dependentFamilyMembers?.find(
      (dependentFamilyMembers) =>
        dependentFamilyMembers.nationalId === dependentNid
    );

    if (dependent) {
      // Access the subscribed package details for the dependent
      const subscribedPackage = dependent.subscribedPackage;
      return subscribedPackage;

      if (!subscribedPackage) {
        throw new Error("Dependent family member has no subscribed package");
      }
    }
  }
};

export const viewHealthCarePackageStatusService = async (patientId: string) => {
  // Find the patient by ID
  const patient = await Patient.findById(patientId).select(
    "+subscribedPackage"
  );
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
    endDate: subscribedPackage.endDate,
  };

  return subscriptionStatus;
};

export const viewHealthCarePackageStatusForDependentService = async (
  patientId: string,
  dependentNid: string
) => {
  const patient = await Patient.findById(patientId).select('+dependentFamilyMembers');
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
    endDate: dependent.subscribedPackage?.endDate,
  };
  return subscriptionStatus;
};

export const viewSubscribedHealthPackageService = async (patientId: string) => {
  const patient = await Patient.findById(patientId).select(
    "+subscribedPackage"
  );

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
  const patient = await Patient.findById(patientId).select(
    "+subscribedPackage"
  );

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
  const patient = await Patient.findById(patientId).select(
    "+subscribedPackage"
  );

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
  const patient = await Patient.findById(patientId).select('+dependentFamilyMembers');

  if (!patient) {
    throw new Error("Patient not found");
  }

  if (!patient.dependentFamilyMembers) {
    throw new Error("Dependent family members not found");
  }

  const dependent = patient.dependentFamilyMembers.find(
    (dependentFamilyMembers) =>
      dependentFamilyMembers.nationalId === dependentNid
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
  const patient = await Patient.findById(patientId).select('+dependentFamilyMembers');
  if (!patient) {
    throw new Error("Patient not found");
  }
  if (!patient.dependentFamilyMembers) {
    throw new Error("Dependent family members not found");
  }
  return patient.dependentFamilyMembers;
};
export const viewSubscribedHealthPackageAllDetailsServiceR = async (patientId: string) => {
  const patient = await Patient.findById(patientId).select('+subscribedPackage');
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
  }
};

export const viewSubscribedHealthPackageAllDetailsServiceD = async (patientId:string,patientNId: string) => {
  const patient = await Patient.findById(patientId).select('+dependentFamilyMembers');
  if (!patient) {
    throw new Error("Patient not found");
  }
  if (!patient.dependentFamilyMembers) {
    throw new Error("Dependent family members not found");
  }
  console.log(patientNId)
  console.log(patient.dependentFamilyMembers[0].nationalId)
  
  const dependent = patient.dependentFamilyMembers.find(
    (dependentFamilyMember) =>
      dependentFamilyMember.nationalId.toString() === patientNId
  );
  if (!dependent){
    throw new Error("Dependent family member not found");
  }

  
  const subscribedPackage = dependent?.subscribedPackage!;
  const healthPackage = await HealthPackage.findById(dependent?.subscribedPackage?.packageId);
  
  return {
    subscribedPackage,healthPackage
  }
};