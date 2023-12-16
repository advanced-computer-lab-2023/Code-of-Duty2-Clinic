import { Schema } from "mongoose";

interface IDependentPrescription {
  date: Date;
  doctorId: Schema.Types.ObjectId;
  patientNationalId: string;
  status: "filled" | "unfilled";
  medicines: { medicineId: Schema.Types.ObjectId; dosage: string }[];
  supervisingPatientId: Schema.Types.ObjectId;
}

export default IDependentPrescription;
