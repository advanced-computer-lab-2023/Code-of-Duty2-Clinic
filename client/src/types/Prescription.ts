import { Schema } from 'mongoose';



export interface Prescription {
    date: Date;
    doctorId: Schema.Types.ObjectId;
    patientId: Schema.Types.ObjectId;
    status: 'filled' | 'unfilled';
    medicines: { medicineId: Schema.Types.ObjectId; dosage: string; }[];
}
