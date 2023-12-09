import IFollowUpRequestBaseInfo from "./IFollowUpRequestBaseInfo";

interface IFollowUpAppointmentRequestForDependentPatient
  extends IFollowUpRequestBaseInfo {
  dependentNationalId: string;
}

export default IFollowUpAppointmentRequestForDependentPatient;
