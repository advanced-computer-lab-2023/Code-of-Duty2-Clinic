import UserRole from "../types/enums/UserRole";
import { VerificationStatus } from "../types/enums/VerificationStatus";

export interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: UserRole;
  verificationStatus?: VerificationStatus;
}
