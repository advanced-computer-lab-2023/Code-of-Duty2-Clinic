import { SubscribedPackage } from "./SubscribedPackage";

export interface DependentFamilyMember  {
    name: string;
    nationalId: string;
    age: number;
    gender: 'male' | 'female';
    relation: 'wife' | 'husband' | 'children';
    subscribedPackage?: SubscribedPackage;
}