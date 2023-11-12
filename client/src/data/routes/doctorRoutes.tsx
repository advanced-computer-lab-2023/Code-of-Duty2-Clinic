import Home from "../../pages/doctors/Home";
import UpdateAccountInfo from "../../pages/doctors/UpdateAccountInfo";
import ViewAppointments from "../../pages/doctors/ViewAppointments";
import ViewRegisteredPatients from "../../pages/doctors/ViewRegisteredPatients";

import PatientSearch from "../../pages/doctors/SearchForPatients";
import { Route } from "../../types";
import ViewRegisteredPatientData from "../../pages/doctors/RegistredPatientData/ViewRegisteredPatientData";
import ViewWallet from "../../pages/doctors/wallet/ViewWallet";
export const doctorDashboardRoute: Route = {
  path: "/doctor/dashboard",
  element: <Home />,
};

export const updateAccountInfoRoute: Route = {
  path: "/doctor/account/update",
  element: <UpdateAccountInfo />,
};

export const doctorAppointmentsRoute: Route = {
  path: "/doctor/appointments",
  element: <ViewAppointments />,
};

export const doctorAppointmentDetailsRoute: Route = {
  path: "/doctor/appointment/:appointmentId",
  element: <ViewAppointments />,
};

export const doctorRegisteredPatientsRoute: Route = {
  path: "/doctor/patients",
  element: <ViewRegisteredPatients />,
};

export const doctorRegisteredPatientDetailsRoute: Route = {
  path: "/doctor/patient/:patientId",
  element: <ViewRegisteredPatientData />,
};

export const patientSearchRoute: Route = {
  path: "/doctor/patient/search",
  element: <PatientSearch />,
};

export const doctorWalletRoute: Route = {
  path: "/doctor/wallet",
  element: <ViewWallet />,
};

export const doctorWalletCreationRoute: Route = {
  path: "/doctor/wallet/create",
  element: <ViewWallet />,
};

const routes: Route[] = [
  doctorDashboardRoute,
  updateAccountInfoRoute,
  doctorAppointmentsRoute,
  doctorAppointmentDetailsRoute,
  doctorRegisteredPatientsRoute,
  doctorRegisteredPatientDetailsRoute,
  patientSearchRoute,
  doctorWalletRoute,
  doctorWalletCreationRoute,
];

export default routes;
