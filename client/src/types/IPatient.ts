import { ISubscribedPackage } from './ISubscribedPackage';
import { IDependentFamilyMember } from './IDependentFamilyMember';
import { IRegisteredFamilyMember } from './IRegisteredFamilyMember';
import { IEmergencyContact } from './IEmergencyContact';
import { IUserBaseInfo } from './IUserBaseInfo';


export interface IPatient extends IUserBaseInfo {
  emergencyContact: IEmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: Buffer[];
  subscribedPackage?: ISubscribedPackage;
  dependentFamilyMembers?: IDependentFamilyMember[];
  registeredFamilyMembers?: IRegisteredFamilyMember[];
}
