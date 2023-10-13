import { Schema } from 'mongoose';


export interface IAppointment {
  timePeriod: {
    startTime: Date;
    endTime: Date;
  };
  status: 'upcoming' | 'completed' | 'canceled' | 'rescheduled';
  doctorId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
}
