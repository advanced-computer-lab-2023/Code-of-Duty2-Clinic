export interface DoctorAppointment {
    appointmentId: string;
    doctor: {
        id: string;
        name: string;
        speciality: string;
    },
    timePeriod: {
        startTime: Date;
        endTime: Date;
    };
    status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
}