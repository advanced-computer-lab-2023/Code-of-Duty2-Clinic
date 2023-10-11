import AddFamilyMember from "../../pages/patients/AddFamilyMember";
import Home from "../../pages/patients/Home";
import SearchForDoctors from "../../pages/patients/SearchForDoctors";
import ViewDoctorDetails from "../../pages/patients/ViewDoctorDetails";
import ViewDoctors from "../../pages/patients/ViewDoctors";
import { Route } from "./Route";


export const homeRoute: Route = {
    path: '/patient/:patientId/home',
    component: <Home />   
}
export const viewAllDoctorsRoute: Route = {
    path: '/patient/:patientId/doctors',
    component: <ViewDoctors />   
}
export const viewDoctorDetailsRoute: Route = {
    path: '/patient/:patientId/doctors/:doctorId',
    component: <ViewDoctorDetails />   
}
export const searchForDoctorsRoute: Route = {
    path: '/patient/:patientId/doctors/search',
    component: <SearchForDoctors /> 
}
export const addFamilyMemberRoute: Route = {    
    path: '/patient/:patientId/family-members/add',
    component: <AddFamilyMember />
}

const routes: Route[] = [
    homeRoute,
    viewAllDoctorsRoute,
    viewDoctorDetailsRoute,
    searchForDoctorsRoute,
    addFamilyMemberRoute,
];

export default routes;