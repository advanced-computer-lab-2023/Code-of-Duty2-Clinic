import { IAppointmentBaseInfo } from "../models/appointments/interfaces/IAppointmentBaseInfo";
import { getFormattedDate, getFormattedTime } from "./formatter";

export function getAppointmentNotificationText(
  appointment: IAppointmentBaseInfo,
  name: string
): string {
  return `Your appointment on ${getFormattedDate(
    appointment.timePeriod.startTime.toString()
  )} 
     from ${getFormattedTime(
       appointment.timePeriod.startTime.toString()
     )} to ${getFormattedTime(appointment.timePeriod.endTime.toString())}
    with ${name} has been ${appointment.status}.
    `;
}
