import { Schema } from "mongoose";
import TimePeriod from "../../../../types/TimePeriod";

interface IFollowUpRequestBaseInfo {
  status: "pending" | "accepted" | "rejected";
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
  timePeriod?: TimePeriod;
  reason?: string;
}

export default IFollowUpRequestBaseInfo;
