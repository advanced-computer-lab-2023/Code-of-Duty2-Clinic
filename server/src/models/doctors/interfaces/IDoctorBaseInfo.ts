import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";

export interface IDoctorBaseInfo extends IUserBaseInfo {
    hourlyRate: number;
    affiliation: string;
    educationalBackground: string;
    [key: string]: any;
}
