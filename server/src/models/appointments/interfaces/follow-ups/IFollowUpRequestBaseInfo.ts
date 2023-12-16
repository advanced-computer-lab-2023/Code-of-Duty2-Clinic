import { Schema } from "mongoose";
import TimePeriod from "../../../../types/TimePeriod";

interface IFollowUpRequestBaseInfo {
  status: "pending" | "accepted" | "rejected";
  patientId: Schema.Types.ObjectId | string;
  doctorId: Schema.Types.ObjectId | string;
  timePeriod?: TimePeriod;
  reason?: string;
  patientType?: "registered" | "dependent";
}

export default IFollowUpRequestBaseInfo;
