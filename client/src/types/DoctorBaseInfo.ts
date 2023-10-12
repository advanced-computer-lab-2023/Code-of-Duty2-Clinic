import { UserBaseInfo } from "./UserBaseInfo";

export interface DoctorBaseInfo extends UserBaseInfo {
    hourlyRate: number;
    affiliation: string;
    educationalBackground: string;
    [key: string]: any;
}
