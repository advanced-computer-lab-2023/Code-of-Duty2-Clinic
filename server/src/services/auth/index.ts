import { emailOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";
import { signAndGetAccessToken, signAndGetRefreshToken } from "../../utils/jwt";
import { ROLE } from "../../types/Role";
import { findAdminByEmail } from "../admins";
import { findDoctorByEmail } from "../doctors";
import { findPatientByEmail } from "../patients";
import { User } from "../../types/User";

export const authenticatePatientOrAdmin = async (email: string, password: string) => {
    const adminAuthenticationTokens = await authenticateUserIfAdmin(email, password);
    if(adminAuthenticationTokens) {
        return adminAuthenticationTokens;
    }
    const patientAuthenticationTokens = await authenticateUserIfPatient(email, password);
    if(patientAuthenticationTokens) {
        return patientAuthenticationTokens;
    }
    throw new Error(emailOrPasswordIncorrectErrorMessage);
}

const authenticateUserIfAdmin = async (email: string, password: string) => {
    const admin = await findAdminByEmail(email);
    if(! admin) {
       return null;
    }
    await validateUserPassword(admin, password);
    const user: User = { id: admin._id, role: ROLE.ADMIN };
    const accessToken = signAndGetAccessToken(user);
    const refreshToken = signAndGetRefreshToken(user);
    return { accessToken, refreshToken };   
}

const authenticateUserIfPatient = async (email: string, password: string) => {
    const patient: any = await findPatientByEmail(email);
    if(! patient) {
        return null;
    }
    await validateUserPassword(patient, password);
    const user = { id: patient._id, role: ROLE.PATIENT };
    const accessToken = signAndGetAccessToken(user);
    const refreshToken = signAndGetRefreshToken(user);
    return {accessToken, refreshToken};
}

export const authenticateDoctor = async (email: string, password: string) => {
    const doctor = await findDoctorByEmail(email);
    if (!doctor) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
    await validateUserPassword(doctor, password);
    const user = { id: doctor._id, role: ROLE.DOCTOR };
    const accessToken = signAndGetAccessToken(user);
    const refreshToken = signAndGetRefreshToken(user);

    return { accessToken, refreshToken };
}

const validateUserPassword = async (user: any, password: string) => {
    const isPasswordCorrect = await user.verifyPassword(password);
    if (!isPasswordCorrect) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
}
