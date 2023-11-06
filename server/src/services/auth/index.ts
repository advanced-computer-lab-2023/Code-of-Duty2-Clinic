import { emailOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";
import { signAndGetAccessToken, signAndGetRefreshToken } from "../../utils/jwt";
import { UserRole } from "../../types/UserRole";
import { findAdminByUsername } from "../admins";
import { findDoctorByUsername } from "../doctors";
import { findPatientByUsername } from "../patients";
import { User } from "../../types/User";

export const authenticatePatientOrAdmin = async (username: string, password: string) => {
    const adminAuthenticationTokens = await authenticateUserIfAdmin(username, password);
    if(adminAuthenticationTokens) {
        return adminAuthenticationTokens;
    }
    const patientAuthenticationTokens = await authenticateUserIfPatient(username, password);
    if(patientAuthenticationTokens) {
        return patientAuthenticationTokens;
    }
    throw new Error(emailOrPasswordIncorrectErrorMessage);
}

const authenticateUserIfAdmin = async (email: string, password: string) => {
    const admin = await findAdminByUsername(email);
    if(! admin) {
       return null;
    }
    await validateUserPassword(admin, password);
    const user: User = { id: admin._id, role: UserRole.ADMIN };
    const accessToken = signAndGetAccessToken(user);
    const refreshToken = signAndGetRefreshToken(user);
    return { accessToken, refreshToken, role: UserRole.ADMIN };   
}

const authenticateUserIfPatient = async (email: string, password: string) => {
    const patient: any = await findPatientByUsername(email);
    if(! patient) {
        return null;
    }
    await validateUserPassword(patient, password);
    const user = { id: patient._id, role: UserRole.PATIENT };
    const accessToken = signAndGetAccessToken(user);
    const refreshToken = signAndGetRefreshToken(user);
    return {accessToken, refreshToken, role: UserRole.PATIENT};
}

export const authenticateDoctor = async (username: string, password: string) => {
    const doctor = await findDoctorByUsername(username);
    if (!doctor) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
    await validateUserPassword(doctor, password);
    const user = { id: doctor._id, role: UserRole.DOCTOR };
    const accessToken = signAndGetAccessToken(user);
    const refreshToken = signAndGetRefreshToken(user);

    return { accessToken, refreshToken, role: UserRole.DOCTOR };
}

const validateUserPassword = async (user: any, password: string) => {
    const isPasswordCorrect = await user.verifyPassword(password);
    if (!isPasswordCorrect) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
}

export const sendEmailToResetPassword = async (email: string) => {
    const admin = await findAdminByUsername(email);
    if(admin) {
        return ;
    }
    const patient = await findPatientByUsername(email);
    if(patient) {
        return ;
    }
    throw new Error(emailOrPasswordIncorrectErrorMessage);
}
