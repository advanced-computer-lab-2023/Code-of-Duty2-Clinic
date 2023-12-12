import { Schema } from "mongoose";
import { IAppointmentBaseInfo } from "./IAppointmentBaseInfo";

export interface IRegisteredPatientAppointment extends IAppointmentBaseInfo {
  patientId: Schema.Types.ObjectId;
}
