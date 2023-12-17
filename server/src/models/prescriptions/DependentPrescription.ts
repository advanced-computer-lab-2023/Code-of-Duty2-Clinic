import mongoose, { Document, Schema } from "mongoose";
import IDependentPrescription from "./interfaces/IDependentPrescription";

export interface IDependentPrescriptionModel extends IDependentPrescription, Document {}

export const DependentPrescriptionSchema = new Schema<IDependentPrescriptionModel>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientNationalId: {
      type: String,
      required: true
    },
    status: { type: String, enum: ["filled", "unfilled"], required: true },
    isSubmitted: { type: Boolean, default: false, required: true },
    isPaid: { type: Boolean, default: false, required: true },
    medicines: {
      type: [
        {
          medicineId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
          name: { type: String, required: true },
          dosage: { type: String, required: true },
          quantity: { type: Number, required: true }
        }
      ]
    },
    supervisingPatientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IDependentPrescriptionModel>(
  "DependentPrescription",
  DependentPrescriptionSchema
);
