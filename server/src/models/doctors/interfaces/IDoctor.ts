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
  $2y$10$DrCg3DCW3ISHwVpZiXbD1.2c6GGo.V28Xd1oXPxxZCbPtZ4XY0V5i}
