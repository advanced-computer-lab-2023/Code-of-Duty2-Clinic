import { IPasswordResetInfo } from "../../users/interfaces/IPasswordReset";
import { IWallet } from "../../wallets/interfaces/IWallet";
import { IDoctorBaseInfo } from "./IDoctorBaseInfo";

export interface IDoctor extends IDoctorBaseInfo {
  speciality?: string;
  availableSlots: [{ startTime: Date; endTime: Date }];
  identificationUrl?: string;
  medicalLicenseUrl?: string;
  medicalDegreeUrl?: string;
  wallet?: IWallet;
  contractUrl?: string;
  contractStatus?: "pending" | "accepted" | "rejected";
  passwordReset?: IPasswordResetInfo;
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyWalletPinCode?: (pinCode: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
  storePassword?: (password: string) => Promise<void>;
}
