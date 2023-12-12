import mongoose, { Document, Schema } from "mongoose";
import { IRegisteredPatientAppointment } from "./interfaces/IRegisteredPatientAppointment";

export interface IAppointmentModel
  extends IRegisteredPatientAppointment,
    Document {}

export const AppointmentSchema = new Schema<IAppointmentModel>({
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
    required: true,
    index: true,
  },
  payerId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  isAFollowUp: { type: Boolean, required: true, default: false },
});

export default mongoose.model<IAppointmentModel>(
  "Appointment",
  AppointmentSchema
);
