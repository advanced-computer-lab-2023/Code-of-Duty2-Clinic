import mongoose, { Document, Schema } from "mongoose";
import IDependentPrescription from "./interfaces/IDependentPrescription";

export interface IDependentPrescriptionModel extends IDependentPrescription, Document {}

export const DependentPrescriptionSchema = new Schema<IDependentPrescriptionModel>(
   {
      doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
      patientNationalId: {
         type: String,
         required: true,
      },
      status: { type: String, enum: ["filled", "unfilled"], required: true },
      medicines: [
         {
            medicineId: {
               type: Schema.Types.ObjectId,
               ref: "Medicine",
               required: true,
            },
            dosage: { type: String, required: true },
         },
      ],
      supervisingPatientId: {
         type: Schema.Types.ObjectId,
         ref: "Patient",
         required: true,
      },
   },
   { timestamps: true }
);

export default mongoose.model<IDependentPrescriptionModel>(
   "DependentPrescription",
   DependentPrescriptionSchema
);
