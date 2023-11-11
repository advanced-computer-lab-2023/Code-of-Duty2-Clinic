import { IPasswordResetInfo } from "../../users/interfaces/IPasswordReset";
import { IWallet } from "../../wallets/interfaces/IWallet";
import { IDoctorBaseInfo } from "./IDoctorBaseInfo";

export interface IDoctor extends IDoctorBaseInfo {
  speciality?: string;
  availableSlots: [{ startTime: Date; endTime: Date }];
  identification?: Buffer;
  medicalLicense?: Buffer;
  medicalDegree?: Buffer;
  wallet?: IWallet;
  contract?: Buffer;
  contractStatus?: "pending" | "accepted" | "rejected";
  passwordReset?: IPasswordResetInfo;
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyWalletPinCode?: (pinCode: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
