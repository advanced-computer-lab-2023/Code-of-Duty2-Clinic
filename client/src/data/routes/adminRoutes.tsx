import AdminForm from "../../components/adminForm";
import UserList from "../../pages/admins/userList";
import { Route } from "../../types";
import HealthPackagesPage from "../../pages/admins/HealthPackages/HealthPackages";
import Home from "../../pages/admins/Home";
import DoctorRegistrationRequests from "../../pages/admins/viewDoctorRequests";
import UpdatePassword from "../../pages/general/UpdatePassword";

export const adminDashboardRoute: Route = {
  path: "/admin/dashboard",
  element: <Home />,
};

export const adminAddRoute: Route = {
  path: "/admin/add",
  element: <AdminForm />,
};

export const userlistRoute: Route = {
  path: "/admin/users",
  element: <UserList />,
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

const routes: Route[] = [
  adminAddRoute,
  userlistRoute,
  viewDoctorRequestsRoute,
  HealthPackagesRoute,
  adminDashboardRoute,
  adminUpdatePasswordRoute,
];

export default routes;
