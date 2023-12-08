import { Schema } from "mongoose";

export interface IAppointmentBaseInfo {
  timePeriod: {
    startTime: Date;
    endTime: Date;
  };
  status: "upcoming" | "completed" | "canceled" | "rescheduled";
  doctorId: Schema.Types.ObjectId;
  payerId?: Schema.Types.ObjectId;
  isAFollowUp: boolean;
}
