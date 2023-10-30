import { getAppointments } from "..";

export const getPatientAppointments = async (userId: string, urlQuery: any) => await getAppointments(true, userId, urlQuery);

