import { Relation } from "../Patient";
import { ISubscribedPackage } from "./ISubscribedPackage";

export interface IDependentFamilyMember {
  name: string;
  nationalId: string;
  dateOfBirth: Date;
  gender: "male" | "female";
  relation: Relation;
  subscribedPackage?: ISubscribedPackage;
  healthRecords?: string[];
}
