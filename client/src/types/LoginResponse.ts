import UserRole from "./enums/UserRole";
import { VerificationStatus } from "./enums/VerficationStatus";

export type LoginResponse = {
  accessToken: string;
  role: UserRole;
  verificationStatus?:VerificationStatus
};
