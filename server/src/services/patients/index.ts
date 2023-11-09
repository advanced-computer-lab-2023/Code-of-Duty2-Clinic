import Patient, { IPatientModel } from "../../models/patients/Patient";
import {
  entityEmailDoesNotExistError,
  entityIdDoesNotExistError,
} from "../../utils/ErrorMessages";

export const findAllPatients = async () => await Patient.find();

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
