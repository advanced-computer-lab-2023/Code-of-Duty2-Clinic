export interface IAppointment {
    appointmentId: string;
    patient: {
        id: string;
        name: string;
    };
    timePeriod: {
        startTime: Date;
        endTime: Date;
    };
    status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
}