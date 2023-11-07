import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";
import { ISubscribedPackage } from "./ISubscribedPackage";
import { IDependentFamilyMember } from "./IDependentFamilyMember";
import { IRegisteredFamilyMember } from "./IRegisteredFamilyMember";
import { IEmergencyContact } from "./IEmergencyContact";
import { UserRole } from "../../../types/UserRole";

export interface IPatient extends IUserBaseInfo {
  role?: UserRole.PATIENT;
  emergencyContact: IEmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: string[];
  subscribedPackage?: ISubscribedPackage;
  dependentFamilyMembers?: IDependentFamilyMember[];
  registeredFamilyMembers?: IRegisteredFamilyMember[];
  wallet?: {
    amount: number;
    currency: string;
    pinCode: string;
  };
  passwordReset?: {
    otp: string;
    expiryDate: Date;
  };
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
