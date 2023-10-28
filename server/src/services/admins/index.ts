import Admin from "../../models/admins/Admin";

export const findAllAdmins = async () => await Admin.find();

export const findAdminById = async (id: string) => await Admin.findById(id);

export const findAdminByUsername = async (username: string) => await Admin.findOne({ username });

export const deleteAdminById = async (id: string) => await Admin.findByIdAndDelete(id);

export const createNewAdmin = async (username: string, password: string) => {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
}