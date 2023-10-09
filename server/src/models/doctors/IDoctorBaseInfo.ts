import { IUserBaseInfo } from "../IUserBaseInfo";

export interface IDoctorBaseInfo extends IUserBaseInfo {
    hourlyRate: number;
    affiliation: string;
    educationalBackground: string;
    [key: string]: any;
}
