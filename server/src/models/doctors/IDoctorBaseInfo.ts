import { IUserBaseInfo } from "models/IUserBaseInfo";

export interface IDoctorBaseInfo extends IUserBaseInfo {
    hourlyRate: number;
    affiliation: string;
    educationalBackground: string;
}
