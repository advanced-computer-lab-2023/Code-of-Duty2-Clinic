export interface IAppointmentDetails {
    appointmentId: string;
    patient: {
        id: string;
        name: string;
        email: string;
        mobileNumber: string;
        gender: "male" | "female";
        age: number;
    };
    timePeriod: {
        startTime: Date;
        endTime: Date;
    };
    status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
}