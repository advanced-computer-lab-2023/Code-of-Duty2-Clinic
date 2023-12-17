import AdminForm from "../../pages/admins/adminForm";
import { Route } from "../../types";
import HealthPackagesPage from "../../pages/admins/HealthPackages/HealthPackages";
import Home from "../../pages/admins/Home";
import UpdatePassword from "../../pages/general/UpdatePassword";
import ViewDoctorRegistrationRequest from "../../pages/admins/DoctorRequests/viewDetailsofRequest";
import DoctorRegistrationRequests from "../../pages/admins/DoctorRequests/viewDoctorRequests";
import ViewAllPatients from "../../pages/admins/ViewAllPatients";
import ViewAllDoctors from "../../pages/admins/ViewAllDoctors";
import ViewAllAdmins from "../../pages/admins/ViewAllAdmins";
import AdminPatientInfoCard from "../../pages/admins/AdminPatientInfoCard";
import AdminDoctorInfoCard from "../../pages/admins/AdminDoctorInfoCard";
import UserRemovalSuccess from "../../pages/admins/UserRemovalSuccess";

export const adminDashboardRoute: Route = {
  path: "/admin/dashboard",
  element: <Home />,
};

export const adminAddRoute: Route = {
  path: "/admin/add",
  element: <AdminForm />,
};

export const viewAllPatientsRoute: Route = {
  path: "/admin/users/patients",
  element: <ViewAllPatients />,
};

export const viewAllDoctorsRoute: Route = {
  path: "/admin/users/doctors",
  element: <ViewAllDoctors />,
};

export const viewAllAdminsRoute: Route = {
  path: "/admin/users/admins",
  element: <ViewAllAdmins />,
};

export const viewPatientInfoRoute: Route = {
  path: "/admin/users/patients/info",
  element: <AdminPatientInfoCard />,
};

export const viewDoctorInfoRoute: Route = {
  path: "/admin/users/doctors/info",
  element: <AdminDoctorInfoCard />,
};

export const viewDoctorRequestsRoute: Route = {
  path: "/admin/doctor-requests",
  element: <DoctorRegistrationRequests />,
};

export const HealthPackagesRoute: Route = {
  path: "/admin/healthPackages",
  element: <HealthPackagesPage />,
};

export const adminUpdatePasswordRoute: Route = {
  path: "/admin/update-password",
  element: <UpdatePassword />,
};

export const doctorRequestPage: Route = {
  path: "/admin/doctor/:doctorId",
  element: <ViewDoctorRegistrationRequest />,
};

export const UserRemovalSuccessRoute: Route = {
  path: "/admin/users/remove/success",
  element: <UserRemovalSuccess />,
};

const routes: Route[] = [
  adminAddRoute,
  viewAllPatientsRoute,
  viewAllDoctorsRoute,
  viewAllAdminsRoute,
  viewPatientInfoRoute,
  viewDoctorInfoRoute,
  viewDoctorRequestsRoute,
  HealthPackagesRoute,
  adminDashboardRoute,
  doctorRequestPage,
  adminUpdatePasswordRoute,
  UserRemovalSuccessRoute,
];

export default routes;
