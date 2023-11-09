import { UserRole } from "../../../types/UserRole";

export interface IAdmin {
  role?: UserRole.ADMIN;
  username: string;
  password: string;
  passwordReset?: {
    otp: string;
    expiryDate: Date;
  };
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
