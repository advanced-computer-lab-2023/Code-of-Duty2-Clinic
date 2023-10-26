import { IUserBaseInfo } from '../../users/interfaces/IUserBaseInfo';
import { ISubscribedPackage } from './ISubscribedPackage';
import { IDependentFamilyMember } from './IDependentFamilyMember';
import { IRegisteredFamilyMember } from './IRegisteredFamilyMember';
import { IEmergencyContact } from './IEmergencyContact';


export interface IPatient extends IUserBaseInfo {
  emergencyContact: IEmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: string[];
  subscribedPackage?: ISubscribedPackage;
  dependentFamilyMembers?: IDependentFamilyMember[];
  registeredFamilyMembers?: IRegisteredFamilyMember[];
  wallet: {
    amount: number;
    currency: string;
    pinCode: string;
  };
}
