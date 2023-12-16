import { Schema } from "mongoose";
import IFollowUpRequestBaseInfo from "./IFollowUpRequestBaseInfo";

interface IFollowUpAppointmentRequestForRegisteredPatient
  extends IFollowUpRequestBaseInfo {
  patientType: "registered";
}

export default IFollowUpAppointmentRequestForRegisteredPatient;
