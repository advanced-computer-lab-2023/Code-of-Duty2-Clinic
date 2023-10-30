import DoctorRegistrationRequest from "../../../models/doctors/DoctorRegistrationRequest";
import { IDoctorBaseInfo } from "../../../models/doctors/interfaces/IDoctorBaseInfo";

export const findAllDoctorRegistrationRequests = async () => await DoctorRegistrationRequest.find();

export const findDoctorRegistrationRequestByEmail = async (email: string) => await DoctorRegistrationRequest.findOne({ email });

export const findDoctorRegistrationRequestById = async (id: string) => await DoctorRegistrationRequest.findById(id);

export const findDoctorRegistrationRequestByUsername = async (username: string) => await DoctorRegistrationRequest.findOne({ username });   


export const createNewDoctorRegistrationRequest = async (request: IDoctorBaseInfo) => {
    const existingDoctorRequestByEmail = await DoctorRegistrationRequest.findOne({ email: request.email });
    const existingDoctorRequestByUsername = await DoctorRegistrationRequest.findOne({ username: request.username });
    
    if (existingDoctorRequestByEmail) {
        throw new Error('Email already exists. Please use a different email.');
    }
    
    if (existingDoctorRequestByUsername) {
        throw new Error('Username already exists. Please choose a different username.');
    }

    if(isAWeakPassword(request.password)) {
        throw new Error('Password must be strong (min 8 characters, uppercase, lowercase, number, special character).');
    }
    
    const newDoctorRegistrationRequest = new DoctorRegistrationRequest({
        username: request.username,
        password: request.password,
        email: request.email,
        name: request.name,
        gender: request.gender,
        mobileNumber: request.mobileNumber,
        dateOfBirth: request.dateOfBirth,
        hourlyRate: request.hourlyRate,
        affiliation: request.affiliation,
        educationalBackground: request.educationalBackground,
    });
    return await newDoctorRegistrationRequest.save();
}

function isAWeakPassword(password: string) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return ! strongPasswordRegex.test(password);
}
