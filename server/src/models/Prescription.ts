//Import mongoose and Schema
import mongoose,{Document,Schema } from 'mongoose';


// Define the interface for Prescription
export interface IPrescription {

     date:Date;
     doctor_id:Schema.Types.ObjectId;
     patient_id:Schema.Types.ObjectId;
     status:'filled'|'unfilled';
     medicines: [{medicineName:string, dosage:string}], 

} 

export interface IPrescriptionModel extends IPrescription , Document{}

export const PrescriptionSchema = new Schema<IPrescriptionModel>({

    date:{type:Date, required:true},
    doctor_id:{type:Schema.Types.ObjectId,required:true},
    patient_id:{type:Schema.Types.ObjectId,required:true},
    status: {type: String, enum:['filled', 'unfilled'],required:true},
    medicines:[
        {
            medicineName:{type:String, required:true},
            dosage:{type:String, required:true}
        }
    ], 

})

export default mongoose.model<IPrescriptionModel>('ClinicPatient', PrescriptionSchema);