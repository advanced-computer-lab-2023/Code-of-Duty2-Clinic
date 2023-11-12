import UserRole from "./UserRole";
import { VerificationStatus } from "./VerficationStatus";

export type User = {
  id: string;
  role: UserRole;
  verificationStatus?: VerificationStatus;
};
