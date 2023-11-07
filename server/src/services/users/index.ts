import { User } from "../../types/User";
import { IUserModel } from "../../types/UserModel";
import { UserRole } from "../../types/UserRole";
import {
  deleteAdminById,
  findAdminByEmail,
  findAdminById,
  findAdminByUsername,
  findAllAdmins,
} from "../admins";
import {
  deleteDoctorById,
  findAllDoctors,
  findDoctorByEmail,
  findDoctorById,
  findDoctorByUsername,
} from "../doctors";
import {
  deletePatientById,
  findAllPatients,
  findPatientByEmail,
  findPatientById,
  findPatientByUsername,
} from "../patients";

export const findAllUsersByType = async (Type: string) => {
  switch (Type.toLowerCase()) {
    case "patient":
      return await findAllPatients();
    case "doctor":
      return await findAllDoctors();
    case "admin":
      return await findAllAdmins();
    default:
      throw new Error("Invalid user type");
  }
};

export const removeUser = async (username: string, Type: string) => {
  const user = await findUserByUsername(username, Type);

  if (!user) throw new Error("User not found");

  switch (Type.toLowerCase()) {
    case "patient":
      await deletePatientById(user._id);
      break;
    case "doctor":
      await deleteDoctorById(user._id);
      break;
    case "admin":
      await deleteAdminById(user._id);
      break;
    default:
      throw new Error("Invalid user type");
  }
  return user;
};

export const findUser = async (user: User, elementsToSelect?: any) => {
  switch (user.role) {
    case UserRole.PATIENT:
      return await findPatientById(user.id, elementsToSelect);
    case UserRole.DOCTOR:
      return await findDoctorById(user.id);
    case UserRole.ADMIN:
      return await findAdminById(user.id, elementsToSelect);
    default:
      throw new Error("Invalid user type");
  }
};

export const findUserByUsername = async (username: string, Type: string) => {
  switch (Type.toLowerCase()) {
    case "patient":
      return await findPatientByUsername(username);
    case "doctor":
      return await findDoctorByUsername(username);
    case "admin":
      return await findAdminByUsername(username);
    default:
      throw new Error("Invalid user type");
  }
};
export const findUserByEmail = async (
  email: string,
  elementsToSelect?: any
) => {
  const admin = await findAdminByEmail(email, elementsToSelect);
  if (admin) {
    admin.role = UserRole.ADMIN;
    return admin;
  }

  const doctor = await findDoctorByEmail(email, elementsToSelect);
  if (doctor) {
    doctor.role = UserRole.DOCTOR;
    return doctor;
  }

  const patient = await findPatientByEmail(email, elementsToSelect);
  if (patient) {
    patient.role = UserRole.PATIENT;
    return patient;
  }

  throw new Error("User not found");
};

export const updateUserPassword = async (
  user: IUserModel,
  newPassword: string
) => {
  user.password = newPassword;
  await user.save();
};

export const updatePassword = async (
  userPayload: User,
  newPassword: string
) => {
  const user = await findUser(userPayload);

  if (!user) throw new Error("User not found");

  const isSameOldPassword = await user.verifyPassword?.(newPassword);
  if (isSameOldPassword) throw new Error("New password is the same as old");

  updateUserPassword(user, newPassword);
  return user;
};
