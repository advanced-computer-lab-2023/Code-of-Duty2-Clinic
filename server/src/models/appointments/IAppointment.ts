import { Schema } from 'mongoose';


export interface IAppointment {
  date: Date;
  status: 'Upcoming' | 'Completed' | 'Canceled' | 'Scheduled';
  doctor_id: Schema.Types.ObjectId;
  patient_id: Schema.Types.ObjectId;
}
