import { Schema } from 'mongoose';


export interface AppointmentsFilterQuery {
  date: Date;
  status: 'upcoming' | 'completed' | 'canceled' | 'rescheduled';
  doctorId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
}