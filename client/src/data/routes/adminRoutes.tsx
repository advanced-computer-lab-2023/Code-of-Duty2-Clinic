import AdminForm from "../../components/adminForm";
import UserList from "../../pages/admins/userList";
import { Route } from "./Route";
import DoctorRegistrationRequests from"../../pages/admins/viewDoctorRequests"
import HealthPackagesPage from "../../pages/admins/HealthPackages";


export const adminAddRoute: Route = {
    path: '/admin/add',
    component: <AdminForm />
}

export const userlistRoute: Route = {
    path: '/admin/users',
    component: <UserList />
}

export const viewDoctorRequestsRoute: Route = {
    path: '/admin/doctor-requests',
    component: <DoctorRegistrationRequests />
}

export const HealthPackagesRoute :Route ={
    path:"/admin/healthPackages" ,
    component:<HealthPackagesPage/>
}
const routes: Route[] = [
    adminAddRoute,
    userlistRoute,
    viewDoctorRequestsRoute,
    HealthPackagesRoute,
];

export default routes;