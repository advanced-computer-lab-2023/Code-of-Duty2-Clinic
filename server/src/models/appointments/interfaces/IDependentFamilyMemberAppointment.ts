import { Schema } from "mongoose";
import { IAppointmentBaseInfo } from "./IAppointmentBaseInfo";

export interface IDependentFamilyMemberAppointment
  extends IAppointmentBaseInfo {
  dependentNationalId: string;
}
