import UserRole from "./enums/UserRole";
import { VerificationStatus } from "./enums/VerificationStatus";

export type LoginResponse = {
  accessToken: string;
  role: UserRole;
  verificationStatus?: VerificationStatus;
  info: {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
  } | null;
};
