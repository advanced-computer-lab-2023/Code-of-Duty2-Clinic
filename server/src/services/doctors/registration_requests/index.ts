import DoctorRegistrationRequest from "../../../models/doctors/DoctorRegistrationRequest";

export const findAllDoctorRegistrationRequests = async () => await DoctorRegistrationRequest.find();

export const findDoctorRegistrationRequestByEmail = async (email: string) => await DoctorRegistrationRequest.findOne({ email });
