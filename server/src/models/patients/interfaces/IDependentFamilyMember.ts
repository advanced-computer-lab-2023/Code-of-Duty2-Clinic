import { ISubscribedPackage } from "./ISubscribedPackage";

export interface IDependentFamilyMember  {
    name: string;
    nationalId: string;
    age: number;
    gender: 'male' | 'female';
    relation: 'wife' | 'husband' | 'children';
    subscribedPackage?: ISubscribedPackage;
}