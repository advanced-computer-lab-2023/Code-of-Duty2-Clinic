import Doctor from "../../models/doctors/Doctor";
import bcrypt from 'bcrypt';

export const findAllDoctors = async () => 
    await Doctor.find();

export const findDoctorById = async (id: string) => 
    await Doctor.findById(id);

export const findDoctorByUsername = async (username: string) => 
    await Doctor.findOne({ username }).select({ _id: 1, password: 1 }).lean();

export const findDoctorByEmail = async (email: string) => 
    await Doctor.findOne({ email }).select({ _id: 1, password: 1 }).lean();

export const deleteDoctorById = async (id: string) => 
    await Doctor.findByIdAndDelete(id);

export const createNewDoctor = async (username: string, password: string) => {
    const saltRound=10;
    const hashedPassword= await bcrypt.hash(password, saltRound)
    const newDoctor = new Doctor({ username, password: hashedPassword });
    await newDoctor.save();
}

