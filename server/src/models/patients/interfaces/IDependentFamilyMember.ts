import { ISubscribedPackage } from "./ISubscribedPackage";

export interface IDependentFamilyMember  {
    name: string;
    nationalId: string;
    birthdate: Date;
    gender: 'male' | 'female';
    relation: 'wife' | 'husband' | 'children';
    subscribedPackage?: ISubscribedPackage;
}