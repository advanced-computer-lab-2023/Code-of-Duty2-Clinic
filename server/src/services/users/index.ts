import { deleteAdminById, findAdminByUsername, findAllAdmins } from "../admins";
import { deleteDoctorById, findAllDoctors, findDoctorByUsername } from "../doctors";
import { deletePatientById, findAllPatients, findPatientByUsername } from "../patients";


export const findAllUsersByType = async (Type: string) => {
    switch (Type.toLowerCase()) {
        case 'patient':
            return await findAllPatients();
        case 'doctor':
            return await findAllDoctors();
        case 'admin':
            return await findAllAdmins();
        default:
            throw new Error('Invalid user type');
    }
}

export const removeUser = async (username: string, Type: string) => {
    const user = await getUser(username, Type);

    if (!user) throw new Error('User not found');

    switch(Type.toLowerCase()) {
        case 'patient':
            await deletePatientById(user._id);
            break;
        case 'doctor':
            await deleteDoctorById(user._id);
            break;
        case 'admin':
            await deleteAdminById(user._id);
            break;
        default:
            throw new Error('Invalid user type');            
    }
    return user;
}

export const getUser = async (username: string, Type: string) => {
    switch (Type.toLowerCase()) {
        case 'patient':
          return await findPatientByUsername(username);
        case 'doctor':
          return await findDoctorByUsername(username);
        case 'admin':
          return await findAdminByUsername(username);
        default:
          throw new Error('Invalid user type');
    }
}
