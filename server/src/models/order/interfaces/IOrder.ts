import { Schema } from "mongoose";

export interface IOrder {
  patientId: Schema.Types.ObjectId;
  patientName: string;
  patientAddress: string;
  patientMobileNumber: string;
  medicines: Array<{ medicineId: Schema.Types.ObjectId; quantity: number }>;
  paidAmount: number;
  paymentMethod: "wallet" | "card" | "cod";
  timestamp: Date;
  orderStatus: "successful" | "pending" | "failed";
}