export interface Appointment {
  appointmentId: string;
  status: "upcoming" | "completed" | "canceled" | "rescheduled";
  user: {
    id: string;
    name: string;
  };
  timePeriod: {
    startTime: Date;
    endTime: Date;
  };
  isForDependent?: boolean;
}
