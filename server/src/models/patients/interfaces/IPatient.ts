import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";
import { ISubscribedPackage } from "./ISubscribedPackage";
import { IDependentFamilyMember } from "./IDependentFamilyMember";
import { IRegisteredFamilyMember } from "./IRegisteredFamilyMember";
import { IEmergencyContact } from "./IEmergencyContact";
import UserRole from "../../../types/UserRole";
import { IWallet } from "../../wallets/interfaces/IWallet";
import { IPasswordResetInfo } from "../../users/interfaces/IPasswordReset";

export interface IPatient extends IUserBaseInfo {
  role?: UserRole.PATIENT;
  emergencyContact: IEmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: string[];
  subscribedPackage?: ISubscribedPackage;
  dependentFamilyMembers?: IDependentFamilyMember[];
  registeredFamilyMembers?: IRegisteredFamilyMember[];
  registeredFamilyMemberRequests?: IRegisteredFamilyMember[];
  wallet?: IWallet;
  passwordReset?: IPasswordResetInfo;
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyWalletPinCode?: (pinCode: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
