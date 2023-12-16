import PrescribedMedicine from "./PrescribedMedicine";

export interface Prescription {
   date: Date;
   doctorId: string;
   patientId: string;
   status: "filled" | "unfilled";
   medicines: Array<PrescribedMedicine>;
}
