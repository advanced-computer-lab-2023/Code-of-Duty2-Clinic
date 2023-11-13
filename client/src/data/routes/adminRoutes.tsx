import AdminForm from '../../components/adminForm';
import UserList from '../../pages/admins/userList';
import { Route } from '../../types';
import DoctorRegistrationRequests from '../../pages/admins/DoctorRequests/viewDoctorRequests';
import HealthPackagesPage from '../../pages/admins/HealthPackages/HealthPackages';
import Home from '../../pages/admins/Home';
import ViewDoctorRegistrationRequest from '../../pages/admins/DoctorRequests/viewDetailsofRequest';

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


export const doctorRequestPage: Route = {
    path: "/admin/doctor/:doctorId",
    element: <ViewDoctorRegistrationRequest/>,
  };
  

const routes: Route[] = [
    adminAddRoute,
    userlistRoute,
    viewDoctorRequestsRoute,
    HealthPackagesRoute,
    adminDashboardRoute,
    doctorRequestPage,
];

export default routes;