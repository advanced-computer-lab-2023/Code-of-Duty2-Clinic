import Home from "../../pages/doctors/Home";
import UpdateAccountInfo from "../../pages/doctors/UpdateAccountInfo";
import ViewAppointments from "../../pages/doctors/ViewAppointments";
import ViewRegisteredPatients from "../../pages/doctors/ViewRegisteredPatients";
import { Route } from "./Route";


export const doctorHomeRoute: Route = {
    path: '/doctor/home',
    component: <Home />
}

export const updateAccountInfoRoute: Route = {
    path: '/doctor/:doctorId/account/update',
    component: <UpdateAccountInfo />
}

export const doctorAppointmentsRoute: Route = {
    path: '/doctor/:doctorId/appointments',
    component: <ViewAppointments />
}

export const doctorAppointmentDetailsRoute: Route = {
    path: '/doctor/:doctorId/appointment/:appointmentId',
    component: <ViewAppointments />
}

export const doctorRegisteredPatientsRoute: Route = {
    path: '/doctor/:doctorId/patients',
    component: <ViewRegisteredPatients />
}

export const doctorRegisteredPatientDetailsRoute: Route = {
    path: '/doctor/:doctorId/patient/:patientId',
    component: <ViewRegisteredPatients />
}

const routes: Route[] = [
    doctorHomeRoute,
    updateAccountInfoRoute,
    doctorAppointmentsRoute,
    doctorAppointmentDetailsRoute,
    doctorRegisteredPatientsRoute,
];

export default routes;