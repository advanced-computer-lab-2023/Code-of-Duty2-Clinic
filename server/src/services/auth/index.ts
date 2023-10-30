import { emailOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";
import { signAndGetAccessToken, signAndGetRefreshToken } from "../../utils/jwt";
import { ROLE } from "../../types/Role";
import { findAdminByEmail } from "../admins";
import { findDoctorByEmail } from "../doctors";
import { findPatientByEmail } from "../patients";

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
    const user: any = await findAdminByEmail(email);
    if(! user) {
       return null;
    }
    await validateUserPassword(user, password);
    const accessToken = signAndGetAccessToken(user._id, ROLE.ADMIN);
    const refreshToken = signAndGetRefreshToken(user._id, ROLE.ADMIN);
    return { accessToken, refreshToken };   
}

const authenticateUserIfPatient = async (email: string, password: string) => {
    const user: any = await findPatientByEmail(email);
    if(! user) {
        return null;
    }
    await validateUserPassword(user, password);
    const accessToken = signAndGetAccessToken(user._id, ROLE.PATIENT);
    const refreshToken = signAndGetRefreshToken(user._id, ROLE.PATIENT);
    return {accessToken, refreshToken};
}

export const authenticateDoctor = async (email: string, password: string) => {
    const user = await findDoctorByEmail(email);
    if (!user) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
    await validateUserPassword(user, password);
    const accessToken = signAndGetAccessToken(user._id, ROLE.DOCTOR);
    const refreshToken = signAndGetRefreshToken(user._id, ROLE.DOCTOR);

    return { accessToken, refreshToken };
}

const validateUserPassword = async (user: any, password: string) => {
    const isPasswordCorrect = await user.verifyPassword(password);
    if (!isPasswordCorrect) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
}
