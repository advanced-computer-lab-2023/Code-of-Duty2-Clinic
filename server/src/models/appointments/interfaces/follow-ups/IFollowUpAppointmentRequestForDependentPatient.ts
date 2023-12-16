import IFollowUpRequestBaseInfo from "./IFollowUpRequestBaseInfo";

interface IFollowUpAppointmentRequestForDependentPatient
  extends IFollowUpRequestBaseInfo {
  dependentNationalId: string;
  patientType: "dependent";
}

export default IFollowUpAppointmentRequestForDependentPatient;
