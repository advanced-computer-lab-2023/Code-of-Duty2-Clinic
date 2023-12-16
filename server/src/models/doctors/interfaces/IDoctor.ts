import { INotification } from "../../notifications/interfaces/INotification";
import { IPasswordResetInfo } from "../../users/interfaces/IPasswordReset";
import { IWallet } from "../../wallets/interfaces/IWallet";
import { IDoctorBaseInfo } from "./IDoctorBaseInfo";

export interface IDoctor extends IDoctorBaseInfo {
  speciality?: string;
  workingSchedule: {
    daysOff: string[];
    dailyWorkingHours: {
      startTime: string;
      endTime: string;
    }[];
  };
  identificationUrl?: string;
  medicalLicenseUrl?: string;
  medicalDegreeUrl?: string;
  wallet?: IWallet;
  contractUrl?: string;
  contractStatus?: "pending" | "accepted" | "rejected";
  passwordReset?: IPasswordResetInfo;
  receivedNotifications?: INotification[];
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyWalletPinCode?: (pinCode: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
  storePassword?: (password: string) => Promise<void>;
}
