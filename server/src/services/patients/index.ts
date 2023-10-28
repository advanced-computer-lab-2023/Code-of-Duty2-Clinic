import Patient from "../../models/patients/Patient";
import bcrypt from 'bcrypt';

export const findAllPatients = async () => await Patient.find();

export const findPatientById = async (id: string) => await Patient.findById(id);

export const findPatientByUsername = async (username: string) => await Patient.findOne({ username });

export const deletePatientById = async (id: string) => await Patient.findByIdAndDelete(id);

export const createNewPatient = async (username: string, password: string) => {
    const saltRound=10;
    const hashedPassword= await bcrypt.hash(password, saltRound)
    const newPatient = new Patient({ username, password: hashedPassword });
    await newPatient.save();
}
