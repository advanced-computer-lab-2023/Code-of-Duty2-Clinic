import UserRole from "../../../types/UserRole";
import { INotification } from "../../notifications/interfaces/INotification";

export interface IAdmin {
  role?: UserRole.ADMIN;
  username: string;
  password: string;
  passwordReset?: {
    otp: string;
    expiryDate: Date;
  };
  receivedNotifications?: INotification[];
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
