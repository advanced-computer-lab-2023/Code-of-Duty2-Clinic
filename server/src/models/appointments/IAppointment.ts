import { Schema } from 'mongoose';


export interface IAppointment {
  date: Date;
  status: 'upcoming' | 'completed' | 'canceled' | 'rescheduled';
  doctorId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
}
