import mongoose, { Document, Schema } from 'mongoose';
import { IAppointment } from './interfaces/IAppointment';

export interface IAppointmentModel extends IAppointment, Document {}

export const  AppointmentSchema = new Schema<IAppointmentModel> ({

    date:{type: Date, required: true},
    status:{type: String, enum:['upcoming','completed','canceled', 'rescheduled'], required: true}, 
    doctorId:{type: Schema.Types.ObjectId, ref:'Doctor', required: true},
    patientId:{type: Schema.Types.ObjectId,ref:'Patient', requred: true},
    
})

export default mongoose.model<IAppointmentModel>('Appointment',AppointmentSchema)


  