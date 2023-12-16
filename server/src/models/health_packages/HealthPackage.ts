import mongoose, { Document, Schema } from "mongoose";
import { IHealthPackage } from "./interfaces/IHealthPackage";

export interface IHealthPackageModel extends IHealthPackage, Document {}

export const HealthPackageSchema = new Schema<IHealthPackageModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  amountToPay: {
    type: Number,
    required: true,
  },
  discounts: {
    gainedDoctorSessionDiscount: {
      type: Number,
      min: [0, "The minimum value is 0"],
      max: [1, "The maximum value is 1"],
      required: true,
    },
    gainedPharmacyMedicinesDiscount: {
      type: Number,
      min: [0, "The minimum value is 0"],
      max: [1, "The maximum value is 1"],
      required: true,
    },
    gainedFamilyMembersDiscount: {
      type: Number,
      min: [0, "The minimum value is 0"],
      max: [1, "The maximum value is 1"],
      required: true,
    },
  },
  packageDurationInYears: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IHealthPackageModel>(
  "HealthPackage",
  HealthPackageSchema
);
