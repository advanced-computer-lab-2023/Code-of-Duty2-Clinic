import Admin from "../../models/admins/Admin";

export const findAllAdmins = async () => await Admin.find();

export const findAdminById = async (id: string) => await Admin.findById(id);

export const findAdminByUsername = async (username: string) => await Admin.findOne({ username }).select({ _id: 1, password: 1 });

export const findAdminByEmail = async (email: string) => await Admin.findOne({ email }).select({ _id: 1, password: 1 });

export const deleteAdminById = async (id: string) => await Admin.findByIdAndDelete(id);

export const createNewAdmin = async (username: string, password: string) => {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
}