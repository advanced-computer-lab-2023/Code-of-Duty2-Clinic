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
import { Route } from "../../types";
import MedicalHistory from "../../pages/patients/medicalHistory/medicalHistory";


export const patientDashboardRoute: Route = {
    path: '/patient/dashboard',
    element: <Home />   
}
export const viewAllDoctorsRoute: Route = {
    path: '/patient/doctors',
    element: <ViewDoctors />   
}
export const viewDoctorDetailsRoute: Route = {
    path: '/patient/doctors/:doctorId',
    element: <ViewDoctorDetails />   
}
export const searchForDoctorsRoute: Route = {
    path: '/patient/doctors/search',
    element: <SearchForDoctors /> 
}
export const addFamilyMemberRoute: Route = {    
    path: '/patient/family-members/add',
    element: <AddFamilyMember />
}
export const patientInfoRoute: Route = {
    path: '/patient/info',
    element: <PatientInfo />
}
export const patientFamilyMembersRoute: Route = {
    path: '/patient/family-members',
    element: <PatientRegisteredFamilyMembers />
}
export const patientAppointmentsRoute: Route = {
    path: '/patient/appointments',
    element: <ViewAppointments />
}
export const patientDoctorAppointmentDetailsRoute: Route = {
    path: 'patient/appointment/:appointmentId',
    element: <ViewAppointments />
}
export const patientRegistrationRoute: Route = {
    path: '/patient/register',
    element: <PatientRegistrationForm />
}

export const patientPrescriptions: Route = {
    path: '/patient/prescriptions',
    element: <PrescriptionsPage/>
}

export const patientMedicalHistoryRoute:Route = {
    path: '/patient/medical-history',
    element:<MedicalHistory/>
}
const routes: Route[] = [
    patientDashboardRoute,
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