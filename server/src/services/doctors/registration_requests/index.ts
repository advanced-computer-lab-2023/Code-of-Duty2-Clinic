import DoctorRegistrationRequest from "../../../models/doctors/DoctorRegistrationRequest";
import { IDoctor } from "../../../models/doctors/interfaces/IDoctor";
import { IDoctorBaseInfo } from "../../../models/doctors/interfaces/IDoctorBaseInfo";

export const findAllDoctorRegistrationRequests = async () =>
  await DoctorRegistrationRequest.find();

export const findDoctorRegistrationRequestByEmail = async (email: string) =>
  await DoctorRegistrationRequest.findOne({ email });

export const findDoctorRegistrationRequestById = async (id: string) =>
  await DoctorRegistrationRequest.findById(id);

export const findDoctorRegistrationRequestByUsername = async (
  username: string,
  elementsToSelect: any
) => {
  return await DoctorRegistrationRequest.findOne({ username }).select(
    elementsToSelect || { _id: 1, password: 1 }
  );
};

export const addDoctorRegistrationFiles = async (id: string, files: any) => {
  return await DoctorRegistrationRequest.findByIdAndUpdate(id, files);
};

export const sendDoctorContract = async (id: string, contractUrl: string) => {
  return await DoctorRegistrationRequest.findByIdAndUpdate(id).set({
    contractUrl,
    status: "accepted",
  });
};

export const getDoctorRegistrationContract = async (id: string) => {
  await DoctorRegistrationRequest.findById(id).select({
    _id: 1,
    contractUrl: 1,
  });
  return await DoctorRegistrationRequest.findById(id).select({
    _id: 1,
    contractUrl: 1,
  });
};

export const rejectSentContract = async (id: string) => {
  return await DoctorRegistrationRequest.findByIdAndUpdate(id).set({
    status: "rejected",
  });
};

export const createNewDoctorRegistrationRequest = async (request: IDoctor) => {
  const existingDoctorRequestByEmail = await DoctorRegistrationRequest.findOne({
    email: request.email,
  });
  if (existingDoctorRequestByEmail) {
    throw new Error("Email already exists. Please use a different email.");
  }

  const existingDoctorRequestByUsername =
    await DoctorRegistrationRequest.findOne({ username: request.username });

  if (existingDoctorRequestByUsername) {
    throw new Error(
      "Username already exists. Please choose a different username."
    );
  }

  if (isAWeakPassword(request.password)) {
    throw new Error(
      "Password must be strong (min 8 characters, uppercase, lowercase, number, special character)."
    );
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
    speciality: request.speciality,
  });
  return await newDoctorRegistrationRequest.save();
};

function isAWeakPassword(password: string) {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return !strongPasswordRegex.test(password);
}
