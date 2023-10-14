import AdminForm from "../../components/adminForm";
import UserList from "../../components/userList";
import { Route } from "./Route";
import DoctorRegistrationRequests from"../../components/viewDoctorRequests"



export const adminAddRoute: Route = {
    path: '/admin/add',
    component: <AdminForm />
}

export const userlistRoute: Route = {
    path: '/admin/users',
    component: <UserList />
}

export const viewDoctorRequestsRoute: Route = {
    path: '/admins/doctor-requests',
    component: <DoctorRegistrationRequests />
}

const routes: Route[] = [
    adminAddRoute,
    userlistRoute,
    viewDoctorRequestsRoute
];

export default routes;