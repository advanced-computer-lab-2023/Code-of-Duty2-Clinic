import { usernameOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";
import { signAndGetAccessToken, signAndGetRefreshToken } from "../../utils/jwt";
import UserRole from "../../types/UserRole";
import { findAdminByUsername } from "../admins";
import { findDoctorByUsername } from "../doctors";
import { findPatientByUsername } from "../patients";
import { User } from "../../types/User";
import { findDoctorRegistrationRequestByUsername } from "../doctors/registration_requests";
import { IDoctorRegistrationRequestModel } from "../../models/doctors/DoctorRegistrationRequest";
import { VerificationStatus } from "../../types/VerificationStatus";
import { IPatientModel } from "../../models/patients/Patient";
import { IDoctorModel } from "../../models/doctors/Doctor";
import { IAdminModel } from "../../models/admins/Admin";

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
  throw new Error(usernameOrPasswordIncorrectErrorMessage);
};

const authenticateUserIfAdmin = async (username: string, password: string) => {
  const admin = await findAdminByUsername(username);
  if (!admin) {
    return null;
  }
  await validateUserPassword(admin, password);
  const user: User = { id: admin._id, role: UserRole.ADMIN };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);
  return { accessToken, refreshToken, role: user.role, info: null };
};

const authenticateUserIfPatient = async (
  username: string,
  password: string
) => {
  const patient: IPatientModel | null = await findPatientByUsername(username, {
    _id: 1,
    password: 1,
    email: 1,
    name: 1,
    imageUrl: 1,
  });
  if (!patient) {
    return null;
  }
  await validateUserPassword(patient, password);
  const user = { id: patient._id, role: UserRole.PATIENT };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);
  return {
    accessToken,
    refreshToken,
    role: user.role,
    info: {
      id: user.id,
      email: patient.email,
      name: patient.name,
      imageUrl: patient.imageUrl,
    },
  };
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
  throw new Error(usernameOrPasswordIncorrectErrorMessage);
};

const authenticateUserIfVerifiedDoctor = async (
  username: string,
  password: string
) => {
  const doctor = await findDoctorByUsername(username, {
    _id: 1,
    email: 1,
    name: 1,
    imageUrl: 1,
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
    verificationStatus: VerificationStatus.accepted,
    info: {
      id: user.id,
      email: doctor.email,
      name: doctor.name,
      imageUrl: doctor.imageUrl,
    },
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
    throw new Error(usernameOrPasswordIncorrectErrorMessage);
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
    info: null,
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
  if (doctor.status === "accepted") {
    return VerificationStatus.accepted;
  }
  return VerificationStatus.rejected;
};

const validateUserPassword = async (
  user:
    | IPatientModel
    | IDoctorModel
    | IAdminModel
    | IDoctorRegistrationRequestModel,
  password: string
) => {
  const isPasswordCorrect = await user.verifyPassword?.(password)!;
  if (!isPasswordCorrect) {
    console.log("password incorrect");
    throw new Error(usernameOrPasswordIncorrectErrorMessage);
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
  throw new Error(usernameOrPasswordIncorrectErrorMessage);
};
