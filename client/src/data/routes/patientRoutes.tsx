import AddFamilyMember from "../../pages/patients/AddFamilyMember";
import Home from "../../pages/patients/Home";
import SearchForDoctors from "../../pages/patients/SearchForDoctors";
import ViewDoctors from "../../pages/patients/ViewDoctors";
import { Route } from "./Route";


export const homeRoute: Route = {
    path: '/patient/home',
    component: <Home />   
}
export const viewAllDoctorsRoute: Route = {
    path: '/patient/doctors',
    component: <ViewDoctors />   
}
export const searchForDoctorsRoute: Route = {
    path: '/patient/doctors/search',
    component: <SearchForDoctors /> 
}
export const addFamilyMemberRoute: Route = {    
    path: '/patient/family-members/add',
    component: <AddFamilyMember />
}

const routes: Route[] = [
    homeRoute,
    viewAllDoctorsRoute,
    searchForDoctorsRoute,
    addFamilyMemberRoute,
];

export default routes;