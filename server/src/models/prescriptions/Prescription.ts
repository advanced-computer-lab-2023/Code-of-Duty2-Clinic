import mongoose,{Document,Schema } from 'mongoose';
import { IPrescription } from './IPrescription';

export interface IPrescriptionModel extends IPrescription , Document{}

export const PrescriptionSchema = new Schema<IPrescriptionModel>({

    date:{type:Date, required:true},
    doctorId:{type:Schema.Types.ObjectId, required:true},
    patientId:{type:Schema.Types.ObjectId, required:true},
    status: {type: String, enum:['filled', 'unfilled'], required:true},
    medicines:[
        {
            medicineId: {type: Schema.Types.ObjectId, required:true},
            dosage: {type:String, required:true}
        }
    ], 

});

export default mongoose.model<IPrescriptionModel>('Prescription', PrescriptionSchema);