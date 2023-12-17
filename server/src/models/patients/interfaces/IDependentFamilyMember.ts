import { Relation } from "../Patient";
import IHealthRecord from "./IHealthRecord";
import { ISubscribedPackage } from "./ISubscribedPackage";

export interface IDependentFamilyMember {
  name: string;
  nationalId: string;
  dateOfBirth: Date;
  gender: "male" | "female";
  relation: Relation;
  subscribedPackage?: ISubscribedPackage;
  healthRecords?: IHealthRecord[];
}
