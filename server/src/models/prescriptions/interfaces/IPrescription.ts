import { Schema } from "mongoose";

export interface IPrescription {
   date: Date;
   doctorId: Schema.Types.ObjectId;
   patientId: Schema.Types.ObjectId;
   status: "filled" | "unfilled";
   isSubmitted: boolean;
   medicines: Array<{
      medicineId: string;
      name: string;
      dosage: string;
      quantity: number;
   }>;
}
