//Import mongoose and Schema
import mongoose, { Document, Schema } from 'mongoose';



// Define the interface for Appointment
  export interface IAppointment {

    date: Date;
    status:'Upcoming' | 'Completed' | 'Canceled'|'Scheduled';
    doctor_id:Schema.Types.ObjectId;
    patient_id:Schema.Types.ObjectId;
  }

  export interface IAppointmentModel extends IAppointment, Document {}

export const  AppointmentSchema = new Schema<IAppointmentModel> ({

    date:{type:Date, required:true},
    status:{type:String, enum:['Subscribed','Unsubscribed','Cancelled'], required:true}, 
    doctor_id:{type:Schema.Types.ObjectId, ref:'Doctor',required:true},
    patient_id:{type:Schema.Types.ObjectId,ref:'ClinicPatient',requred:true},
    
})

export default mongoose.model<IAppointmentModel>('',AppointmentSchema)


  