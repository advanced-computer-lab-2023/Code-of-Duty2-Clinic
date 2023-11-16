import Admin, { IAdminModel } from "../../models/admins/Admin";
import Doctor, { IDoctorModel } from "../../models/doctors/Doctor";
import DoctorRegistrationRequest from "../../models/doctors/DoctorRegistrationRequest";
import {
  entityEmailDoesNotExistError,
  entityIdDoesNotExistError,
} from "../../utils/ErrorMessages";

export const findAllAdmins = async () => await Admin.find();

export const findAdminById = async (id: string, elementsToSelect?: any) => {
  const PromisedAdmin = Admin.findById(id);
  if (!elementsToSelect)
    return await PromisedAdmin.select({ _id: 1, password: 1 });
  return await PromisedAdmin.select(elementsToSelect);
};
export const findAdminByUsername = async (username: string) =>
  await Admin.findOne({ username }).select({ _id: 1, password: 1 });

export const findAdminByEmail = async (
  email: string,
  elementsToSelect?: any
) => {
  const PromisedAdmin = Admin.findOne({ email });
  if (!elementsToSelect)
    return await PromisedAdmin.select({ _id: 1, password: 1 });
  return await PromisedAdmin.select(elementsToSelect);
};

export const deleteAdminById = async (id: string) =>
  await Admin.findByIdAndDelete(id);

export const createNewAdmin = async (username: string, password: string) => {
  const newAdmin = new Admin({ username, password });
  await newAdmin.save();
};

export const updateAdminPasswordByEmail = async (
  email: string,
  newPassword: string
) => {
  const admin = await findAdminByEmail(email);
  if (!admin) {
    throw new Error(entityEmailDoesNotExistError("admin", email));
  }
  await updateAdminPassword(admin, newPassword);
};

export const updatePasswordById = async (
  adminId: string,
  newPassword: string
) => {
  const admin = await findAdminById(adminId);
  if (!admin) {
    throw new Error(entityIdDoesNotExistError("admin", adminId));
  }
  await updateAdminPassword(admin, newPassword);
};
export const updateAdminPassword = async (
  admin: IAdminModel,
  newPassword: string
) => {
  admin.password = newPassword;
  await admin.save();
};

export const rejectDoctorRegistrationRequestService = async (
  username: string
) => {
  try {
    const request = await DoctorRegistrationRequest.findById(username);
    if (!request) {
      throw new Error("Request not found");
    }
    request.status = "rejected";
    await request.save();
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw new Error("Internal Server Error");
  }
};
export const acceptDoctorRegistrationRequestService = async (
  username: string
) => {
  try {
    const request = await DoctorRegistrationRequest.findById(username);
    if (!request) {
      throw new Error("Request not found");
    }

    const newDoctor: IDoctorModel = new Doctor({
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
      availableSlots: request.availableSlots,
      identificationUrl: request.identificationUrl,
      medicalLicenseUrl: request.medicalLicenseUrl,
      medicalDegreeUrl: request.medicalDegreeUrl,
      contractUrl: request.contractUrl,
      contractStatus: "accepted",
    });

    await newDoctor.save();
    request.status = "accepted";
    await request.save();
  } catch (error: any) {
    console.error("Error accepting request:", error);
    throw new Error(error.message);
  }
};
