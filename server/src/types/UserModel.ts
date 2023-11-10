import { IAdminModel } from "../models/admins/Admin";
import { IDoctorModel } from "../models/doctors/Doctor";
import { IPatientModel } from "../models/patients/Patient";

export type IUserModel = IPatientModel | IDoctorModel | IAdminModel;
