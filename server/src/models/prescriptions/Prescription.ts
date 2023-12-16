import mongoose, { Document, Schema } from "mongoose";
import { IPrescription } from "./interfaces/IPrescription";

export interface IPrescriptionModel extends IPrescription, Document {}

export const PrescriptionSchema = new Schema<IPrescriptionModel>(
   {
      doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
      patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
      status: { type: String, enum: ["filled", "unfilled"], default: "unfilled", required: true },
      isSubmitted: { type: Boolean, default: false, required: true },
      medicines: {
         type: [
            {
               medicineId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
               name: { type: String, required: true },
               dosage: { type: String, required: true },
               quantity: { type: Number, required: true },
            },
         ],
      },
   },
   { timestamps: true }
);

export default mongoose.model<IPrescriptionModel>("Prescription", PrescriptionSchema);
