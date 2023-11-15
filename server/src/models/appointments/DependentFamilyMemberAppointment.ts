import mongoose, { Document, Schema } from "mongoose";
import { IAppointment } from "./interfaces/IAppointment";

interface IDependentFamilyMemberAppointment extends IAppointment {
  dependentNationalId: string;
}
export interface IDependentFamilyMemberAppointmentModel
  extends IDependentFamilyMemberAppointment,
    Document {}

export const AppointmentSchema =
  new Schema<IDependentFamilyMemberAppointmentModel>({
    dependentNationalId: { type: String, required: true, index: true },
    timePeriod: {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "canceled", "rescheduled"],
      required: true,
      default: "upcoming",
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      requred: true,
      index: true,
    },
  });

export default mongoose.model<IDependentFamilyMemberAppointmentModel>(
  "DependentFamilyMemberAppointment",
  AppointmentSchema
);
