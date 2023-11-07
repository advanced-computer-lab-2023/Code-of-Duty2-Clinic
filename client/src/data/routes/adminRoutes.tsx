import AdminForm from '../../components/adminForm';
import UserList from '../../pages/admins/userList';
import { Route } from '../../types';
import DoctorRegistrationRequests from'../../pages/admins/viewDoctorRequests'
import HealthPackagesPage from '../../pages/admins/HealthPackages/HealthPackages';
import Home from '../../pages/admins/Home';

export const adminDashboardRoute: Route = {
    path: '/admin/dashboard',
    element: <Home />,
};

export const adminAddRoute: Route = {
    path: '/admin/add',
    element: <AdminForm />
}

export const userlistRoute: Route = {
    path: '/admin/users',
    element: <UserList />
}

export const viewDoctorRequestsRoute: Route = {
    path: '/admin/doctor-requests',
    element: <DoctorRegistrationRequests />
}

export const HealthPackagesRoute :Route ={
    path:'/admin/healthPackages' ,
    element:<HealthPackagesPage/>
}
const routes: Route[] = [
    adminAddRoute,
    userlistRoute,
    viewDoctorRequestsRoute,
    HealthPackagesRoute,
    adminDashboardRoute,
];

export default routes;