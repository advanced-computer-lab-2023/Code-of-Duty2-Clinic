import mongoose, { Schema, Document } from "mongoose";
import { IClinic } from "./interfaces/IClinic";

export interface IClinicModel extends IClinic, Document {}

export const ClinicSchema = new Schema<IClinicModel>(
  {
    name: {
      type: String,
      default: "Clinic",
      required: true,
    },
    commission: {
      type: Number,
      default: 0.1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Clinic = mongoose.model<IClinicModel>("Clinic", ClinicSchema);

export const getClinicCommission = async () => {
  const clinic = await Clinic.findOne({});
  return clinic?.commission || 0.2;
};

export default Clinic;
