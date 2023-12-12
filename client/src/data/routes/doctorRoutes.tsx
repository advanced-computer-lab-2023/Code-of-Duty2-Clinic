import Home from "../../pages/doctors/Home";
import UpdateAccountInfo from "../../pages/doctors/UpdateAccountInfo";
import ViewAppointments from "../../pages/doctors/ViewAppointments";
import ViewDoctorPatients from "../../pages/doctors/ViewDoctorPatients";
import PatientSearch from "../../pages/doctors/SearchForPatients";
import { Route } from "../../types";
import ViewAvailableTimeSlots from "../../pages/doctors/ViewAvailableTimeSlots";
import AddAvailableTimeSlots from "../../pages/doctors/AddAvailableTimeSlots";
import UpdatePassword from "../../pages/general/UpdatePassword";
import PatientList from "../../pages/doctors/PatientList";
import PatientInfo from "../../pages/doctors/PatientInfo";

export const allPatientsRoute: Route = {
  path: "/doctor/patients",
  element: <PatientList />,
};

export const patientInfoRoute: Route = {
  path: "/patient/info",
  element: <PatientInfo />,
};

import ViewWallet from "../../pages/doctors/wallet/ViewWallet";
import ViewRegisteredPatientData from "../../pages/doctors/RegistredPatientData/ViewRegisteredPatientData";
import CreateWallet from "../../pages/doctors/wallet/CreateWallet";
import ChatsView from "../../features/chats/ChatsView";
import DoctorSchedule from "../../pages/doctors/DoctorSchedule";
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
  element: <ViewDoctorPatients />,
};

export const doctorRegisteredPatientDetailsRoute: Route = {
  path: "/doctor/patient/:patientId",
  element: <ViewRegisteredPatientData />,
};

export const patientSearchRoute: Route = {
  path: "/doctor/patient/search",
  element: <PatientSearch />,
};

export const doctorAvailableTimeSlotsRoute: Route = {
  path: "/doctor/available-time-slots",
  element: <ViewAvailableTimeSlots />,
};

export const addDoctorAvailableTimeSlotsRoute: Route = {
  path: "/doctor/add-available-time-slots",
  element: <AddAvailableTimeSlots />,
};

export const doctorUpdatePasswordRoute: Route = {
  path: "/doctor/update-password",
  element: <UpdatePassword />,
};

export const doctorWalletRoute: Route = {
  path: "/doctor/wallet",
  element: <ViewWallet />,
};

export const doctorWalletCreationRoute: Route = {
  path: "/doctor/wallet/create",
  element: <CreateWallet />,
};

export const doctorChatsRoute: Route = {
  path: "/doctor/chats",
  element: <ChatsView />,
};

export const doctorSchedule: Route = {
  path: "/doctor/schedule",
  element: <DoctorSchedule />,
};

const routes: Route[] = [
  doctorDashboardRoute,
  updateAccountInfoRoute,
  doctorAppointmentsRoute,
  doctorAppointmentDetailsRoute,
  doctorRegisteredPatientsRoute,
  doctorRegisteredPatientDetailsRoute,
  patientSearchRoute,
  doctorAvailableTimeSlotsRoute,
  addDoctorAvailableTimeSlotsRoute,
  doctorUpdatePasswordRoute,
  doctorWalletRoute,
  doctorWalletCreationRoute,
  doctorChatsRoute,
  doctorSchedule,
];

export default routes;
