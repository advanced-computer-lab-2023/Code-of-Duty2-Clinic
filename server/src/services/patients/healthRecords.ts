import mongoose, { Mongoose } from "mongoose";
import Patient from "../../models/patients/Patient";
import IHealthRecord from "../../models/patients/interfaces/IHealthRecord";

export const getHealthRecords = async (id: string) => {
  try {
    return (await Patient.findById(id).select({ _id: 0, healthRecords: 1 }))?.healthRecords;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) return "Patient Not Found";
    else return err;
  }
};

export const addHealthRecord = async (id: string, healthRecord: { name: string; url: string }) => {
  try {
    return await Patient.updateOne(
      { _id: id },
      { $push: { healthRecords: healthRecord } },
      { runValidtors: true }
    );
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) return "Patient Not Found";
    else return err;
  }
};

export const deleteHealthRecord = async (id: string, healthRecordLink: string) => {
  try {
    return await Patient.updateOne(
      { _id: id },
      { $pull: { healthRecords: { url: healthRecordLink } } }
    );
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) return "Patient Not Found";
    else return err;
  }
};

export const getDependentPatientHealthRecords = async (dependentId: string, patientId: string) => {
  const patient = await Patient.findById(patientId).select("+dependentFamilyMembers");

  if (!patient) throw new Error("Patient not found");

  if (!patient.dependentFamilyMembers) throw new Error("Dependent family members not found");

  const dependent = patient.dependentFamilyMembers.find(
    (dependentFamilyMember) => dependentFamilyMember.nationalId === dependentId
  );

  if (!dependent) throw new Error("Dependent not found");

  return dependent.healthRecords;
};

export const addDependentHealthRecord = async (
  dependentId: string,
  patientId: string,
  healthRecord: IHealthRecord
) => {
  const patient = await Patient.findById(patientId).select("+dependentFamilyMembers");

  if (!patient) {
    throw new Error("Patient not found");
  }

  if (!patient.dependentFamilyMembers) {
    throw new Error("Dependent family members not found");
  }

  const dependent = patient.dependentFamilyMembers.find(
    (dependentFamilyMembers) => dependentFamilyMembers.nationalId === dependentId
  );

  if (!dependent) {
    throw new Error("Dependent family member not found");
  }

  dependent.healthRecords?.push(healthRecord);

  await patient.save();
};
