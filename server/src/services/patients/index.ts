import Patient from "../../models/patients/Patient";

export const findAllPatients = async () => await Patient.find();

export const findPatientById = async (id: string) => await Patient.findById(id);

export const findPatientByUsername = async (username: string) => await Patient.findOne({ username }).select({ _id: 1, password: 1 });

export const findPatientByEmail = async (email: string) => await Patient.findOne({ email }).select({ _id: 1, password: 1 });

export const deletePatientById = async (id: string) => await Patient.findByIdAndDelete(id);

export const createNewPatient = async (username: string, password: string) => {
    const newPatient = new Patient({ username, password });
    await newPatient.save();
}
