import { IUserBaseInfo } from '../../users/interfaces/IUserBaseInfo';
import { ISubscribedPackage } from './ISubscribedPackage';
import { IDependentFamilyMember } from './IDependentFamilyMember';
import { IRegisteredFamilyMember } from './IRegisteredFamilyMember';
import { IEmergencyContact } from './IEmergencyContact';


export interface IPatient extends IUserBaseInfo {
  emergencyContact: IEmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: Buffer[];
  subscribedPackage?: ISubscribedPackage;
  dependentFamilyMembers?: IDependentFamilyMember[];
  registeredFamilyMembers?: IRegisteredFamilyMember[];
}
