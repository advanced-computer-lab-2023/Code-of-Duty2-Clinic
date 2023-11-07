import Admin, { IAdminModel } from "../../models/admins/Admin";
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
