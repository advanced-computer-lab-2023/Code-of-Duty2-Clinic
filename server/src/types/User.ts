import UserRole from "./UserRole";
import { VerificationStatus } from "./VerificationStatus";

export type User = {
  id: string;
  role: UserRole;
  verificationStatus?: VerificationStatus;
};
