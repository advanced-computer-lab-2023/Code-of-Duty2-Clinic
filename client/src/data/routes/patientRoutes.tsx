import PatientInfo from "../../components/PatientInfo";
import PatientRegisteredFamilyMembers from "../../components/PatientRegisteredFamilyMembers";
import PrescriptionsPage from "../../pages/patients/ViewPrescriptions";
import AddFamilyMember from "../../pages/patients/AddFamilyMember";
import Home from "../../pages/patients/Home";
import SearchForDoctors from "../../pages/patients/SearchForDoctors";
import ViewAppointments from "../../pages/patients/ViewAppointments";
import ViewDoctorDetails from "../../pages/patients/ViewDoctorDetails";
import ViewDoctors from "../../pages/patients/ViewDoctors";
import PatientRegistrationForm from "../../pages/patients/PatientRegistrationForm";
import { Route } from "./Route";
import { patientId } from "../dummyUsers";
import MedicalHistory from "../../pages/patients/medicalHistory/medicalHistory";


export const homeRoute: Route = {
    path: `/patient/${patientId}/home`,
    component: <Home />   
}
export const viewAllDoctorsRoute: Route = {
    path: `/patient/${patientId}/doctors`,
    component: <ViewDoctors />   
}
export const viewDoctorDetailsRoute: Route = {
    path: `/patient/${patientId}/doctors/:doctorId`,
    component: <ViewDoctorDetails />   
}
export const searchForDoctorsRoute: Route = {
    path: `/patient/${patientId}/doctors/search`,
    component: <SearchForDoctors /> 
}
export const addFamilyMemberRoute: Route = {    
    path: `/patient/${patientId}/family-members/add`,
    component: <AddFamilyMember />
}
export const patientInfoRoute: Route = {
    path: `/patient/${patientId}/info`,
    component: <PatientInfo />
}
export const patientFamilyMembersRoute: Route = {
    path: `/patient/${patientId}/family-members`,
    component: <PatientRegisteredFamilyMembers />
}
export const patientAppointmentsRoute: Route = {
    path: `/patient/${patientId}/appointments`,
    component: <ViewAppointments />
}
export const patientDoctorAppointmentDetailsRoute: Route = {
    path: `patient/${patientId}/appointment/:appointmentId`,
    component: <ViewAppointments />
}
export const patientRegistrationRoute: Route = {
    path: `/patient/register`,
    component: <PatientRegistrationForm />
}

export const patientPrescriptions: Route = {
    path: `/patient/${patientId}/prescriptions`,
    component: <PrescriptionsPage/>
}

export const patientMedicalHistoryRoute:Route = {
    path: `/patient/${patientId}/medical-history`,
    component:<MedicalHistory/>
}
const routes: Route[] = [
    homeRoute,
    viewAllDoctorsRoute,
    viewDoctorDetailsRoute,
    searchForDoctorsRoute,
    addFamilyMemberRoute,
    patientInfoRoute,
    patientFamilyMembersRoute,
    patientAppointmentsRoute,
    patientDoctorAppointmentDetailsRoute,
    patientRegistrationRoute,
    patientPrescriptions,
    patientMedicalHistoryRoute
];

export default routes;