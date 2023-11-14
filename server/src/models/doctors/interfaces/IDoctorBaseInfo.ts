import UserRole from "../../../types/UserRole";
import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";

export interface IDoctorBaseInfo extends IUserBaseInfo {
  role?: UserRole.DOCTOR;
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  [key: string]: any;
}
