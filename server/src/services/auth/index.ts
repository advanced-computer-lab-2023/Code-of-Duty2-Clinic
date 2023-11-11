import { emailOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";
import { signAndGetAccessToken, signAndGetRefreshToken } from "../../utils/jwt";
import UserRole from "../../types/UserRole";
import { findAdminByUsername } from "../admins";
import { findDoctorByUsername } from "../doctors";
import { findPatientByUsername } from "../patients";
import { User } from "../../types/User";
import { findDoctorRegistrationRequestByUsername } from "../doctors/registration_requests";
import { IDoctorRegistrationRequestModel } from "../../models/doctors/DoctorRegistrationRequest";
import { VerificationStatus } from "../../types/VerficationStatus";

export const authenticatePatientOrAdmin = async (
  username: string,
  password: string
) => {
  const adminAuthenticationTokens = await authenticateUserIfAdmin(
    username,
    password
  );
  if (adminAuthenticationTokens) {
    return adminAuthenticationTokens;
  }
  const patientAuthenticationTokens = await authenticateUserIfPatient(
    username,
    password
  );
  if (patientAuthenticationTokens) {
    return patientAuthenticationTokens;
  }
  throw new Error(emailOrPasswordIncorrectErrorMessage);
};

const authenticateUserIfAdmin = async (email: string, password: string) => {
  const admin = await findAdminByUsername(email);
  if (!admin) {
    return null;
  }
  await validateUserPassword(admin, password);
  const user: User = { id: admin._id, role: UserRole.ADMIN };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);
  return { accessToken, refreshToken, role: UserRole.ADMIN };
};

const authenticateUserIfPatient = async (email: string, password: string) => {
  const patient: any = await findPatientByUsername(email);
  if (!patient) {
    return null;
  }
  await validateUserPassword(patient, password);
  const user = { id: patient._id, role: UserRole.PATIENT };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);
  return { accessToken, refreshToken, role: UserRole.PATIENT };
};

export const authenticateDoctor = async (
  username: string,
  password: string
) => {
  const doctorAuthenticationTokens = await authenticateUserIfVerifiedDoctor(
    username,
    password
  );
  if (doctorAuthenticationTokens) {
    return doctorAuthenticationTokens;
  }
  const unverifiedDoctorAuthenticationTokens =
    await authenticateUserIfUnverifiedDoctor(username, password);
  if (unverifiedDoctorAuthenticationTokens) {
    return unverifiedDoctorAuthenticationTokens;
  }
  throw new Error(emailOrPasswordIncorrectErrorMessage);
};

const authenticateUserIfVerifiedDoctor = async (
  username: string,
  password: string
) => {
  const doctor = await findDoctorByUsername(username, {
    _id: 1,
    password: 1,
    contractStatus: 1,
  });
  if (!doctor) {
    return null;
  }
  if (doctor.contractStatus !== "accepted") {
    return null;
  }
  await validateUserPassword(doctor, password);
  const user = {
    id: doctor._id,
    role: UserRole.DOCTOR,
  };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    role: UserRole.DOCTOR,
    verificationStatus: VerificationStatus.verified,
  };
};

const authenticateUserIfUnverifiedDoctor = async (
  username: string,
  password: string
) => {
  const unverifiedDoctor = await findDoctorRegistrationRequestByUsername(
    username,
    {
      _id: 1,
      password: 1,
      status: 1,
    }
  );
  if (!unverifiedDoctor) {
    throw new Error(emailOrPasswordIncorrectErrorMessage);
  }
  await validateUserPassword(unverifiedDoctor, password);
  const verificationStatus = getVerificationStatus(unverifiedDoctor);
  if (verificationStatus === VerificationStatus.rejected) {
    throw new Error("Your registration request has been rejected");
  }
  const user = {
    id: unverifiedDoctor._id,
    role: UserRole.UNVERIFIED_DOCTOR,
    verificationStatus,
  };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    role: UserRole.UNVERIFIED_DOCTOR,
    verificationStatus,
  };
};

const getVerificationStatus = (
  doctor: IDoctorRegistrationRequestModel
): VerificationStatus => {
  if (doctor.status === "pending documents upload") {
    return VerificationStatus.pendingDocumentsUpload;
  }
  if (doctor.status === "pending contract acceptance") {
    return VerificationStatus.pendingContractAcceptance;
  }
  return VerificationStatus.rejected;
};

const validateUserPassword = async (user: any, password: string) => {
  const isPasswordCorrect = await user.verifyPassword(password);
  if (!isPasswordCorrect) {
    throw new Error(emailOrPasswordIncorrectErrorMessage);
  }
};

export const sendEmailToResetPassword = async (email: string) => {
  const admin = await findAdminByUsername(email);
  if (admin) {
    return;
  }
  const patient = await findPatientByUsername(email);
  if (patient) {
    return;
  }
  throw new Error(emailOrPasswordIncorrectErrorMessage);
};
