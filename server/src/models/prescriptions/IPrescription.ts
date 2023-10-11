import { Schema } from 'mongoose';



export interface IPrescription {
    date: Date;
    doctorId: Schema.Types.ObjectId;
    patientId: Schema.Types.ObjectId;
    status: 'filled' | 'unfilled';
    medicines: { medicineName: string; dosage: string; }[];
}
