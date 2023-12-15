import { Schema } from "mongoose";

interface IPrescription {
  date: Date;
  doctorId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
  status: "filled" | "unfilled";
  medicines: { medicineId: Schema.Types.ObjectId; dosage: string }[];
}

export default IPrescription;
