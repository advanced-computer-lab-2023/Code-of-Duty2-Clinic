import Patient, { IPatientModel } from "../../models/patients/Patient";
import { entityEmailDoesNotExistError, entityIdDoesNotExistError } from "../../utils/ErrorMessages";

export const findAllPatients = async () => await Patient.find();

export const findPatientById = async (id: string) => await Patient.findById(id);

export const findPatientByUsername = async (username: string) => await Patient.findOne({ username }).select({ _id: 1, password: 1 });

export const findPatientByEmail = async (email: string) => await Patient.findOne({ email }).select({ _id: 1, password: 1 });

export const deletePatientById = async (id: string) => await Patient.findByIdAndDelete(id);

export const createNewPatient = async (username: string, password: string) => {
    const newPatient = new Patient({ username, password });
    await newPatient.save();
}

export const updatePasswordByEmail = async (email: string, newPassword: string) => {
    const patient = await findPatientByEmail(email);
    if (!patient) {
      throw new Error(entityEmailDoesNotExistError('patient', email));
    }
    await updatePassword(patient, newPassword);
}

export const updatePasswordById = async (patientId: string, newPassword: string) => {
    const patient = await findPatientById(patientId);
    if (!patient) {
      throw new Error(entityIdDoesNotExistError('patient', patientId));
    }
    await updatePassword(patient, newPassword);
}

export const updatePassword = async (patient: IPatientModel, newPassword: string) => {
    patient.password = newPassword;
    await patient.save();
}