import { Schema } from "mongoose";

interface IDependentPrescription {
  date: Date;
  doctorId: Schema.Types.ObjectId;
  patientNationalId: string;
  status: "filled" | "unfilled";
  isSubmitted: boolean;
  isPaid: boolean;
  medicines: Array<{
    medicineId: string;
    name: string;
    dosage: string;
    quantity: number;
  }>;
  supervisingPatientId: Schema.Types.ObjectId;
}

export default IDependentPrescription;
