import { UserBaseInfo } from './UserBaseInfo';
import { SubscribedPackage } from './SubscribedPackage';
import { DependentFamilyMember } from './DependentFamilyMember';
import { RegisteredFamilyMember } from './RegisteredFamilyMember';
import { EmergencyContact } from './EmergencyContact';


export interface Patient extends UserBaseInfo {
  emergencyContact: EmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: Buffer[];
  subscribedPackage?: SubscribedPackage;
  dependentFamilyMembers?: DependentFamilyMember[];
  registeredFamilyMembers?: RegisteredFamilyMember[];
  registeredFamilyMemberRequests?: RegisteredFamilyMember[];
}
