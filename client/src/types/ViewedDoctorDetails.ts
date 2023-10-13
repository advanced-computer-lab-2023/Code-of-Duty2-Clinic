export interface DoctorDetails {
    _id: string;
    name: string;
    email: string;
    mobileNumber: string;
    affiliation: string;
    educationalBackground: string;
    sessionPrice: number;
    speciality: string;
    availableSlots: {startTime:string,endTime:string}[];
    image: Buffer;
}