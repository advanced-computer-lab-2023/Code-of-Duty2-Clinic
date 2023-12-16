import mongoose, { Schema } from "mongoose";
import IFollowUpAppointmentRequestForDependentPatient from "./interfaces/follow-ups/IFollowUpAppointmentRequestForDependentPatient";

export interface IFollowUpAppointmentRequestModelForDependentPatient
  extends IFollowUpAppointmentRequestForDependentPatient,
    Document {}

export const FollowUpAppointmentRequestForDependentPatientSchema =
  new Schema<IFollowUpAppointmentRequestModelForDependentPatient>({
    timePeriod: {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
      default: "pending",
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    dependentNationalId: { type: String, required: true },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    reason: { type: String, required: false },
  });

export default mongoose.model<IFollowUpAppointmentRequestModelForDependentPatient>(
  "FollowUpAppointmentRequestForDependentPatient",
  FollowUpAppointmentRequestForDependentPatientSchema
);
