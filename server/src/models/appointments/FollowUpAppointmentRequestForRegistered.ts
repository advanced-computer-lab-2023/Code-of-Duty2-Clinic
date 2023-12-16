import mongoose, { Schema } from "mongoose";
import IFollowUpAppointmentRequestForRegisteredPatient from "./interfaces/follow-ups/IFollowUpAppointmentRequestForRegisteredPatient";

export interface IFollowUpAppointmentRequestModelForRegisteredPatient
  extends IFollowUpAppointmentRequestForRegisteredPatient,
    Document {}

export const FollowUpAppointmentRequestForRegisteredPatientSchema =
  new Schema<IFollowUpAppointmentRequestModelForRegisteredPatient>({
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
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    reason: { type: String, required: false },
  });

export default mongoose.model<IFollowUpAppointmentRequestModelForRegisteredPatient>(
  "FollowUpAppointmentRequestForRegisteredPatient",
  FollowUpAppointmentRequestForRegisteredPatientSchema
);
