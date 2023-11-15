import PatientRegisteredFamilyMembers from "../../pages/patients/RegisteredFamilyMembers/PatientRegisteredFamilyMembers";
import PrescriptionsPage from "../../pages/patients/ViewPrescriptions";
import AddFamilyMember from "../../pages/patients/AddFamilyMember";
import Home from "../../pages/patients/Home";
import SearchForDoctors from "../../pages/patients/SearchForDoctors";
import ViewAppointments from "../../pages/patients/appointments/ViewAppointments";
import ViewDoctorDetails from "../../pages/patients/ViewDoctorDetails";
import ViewDoctors from "../../pages/patients/ViewDoctors";
import { Route } from "../../types";
import MedicalHistory from "../../pages/patients/medicalHistory/medicalHistory";
import AddRegisteredFamilyMember from "../../pages/patients/AddRegisteredFamilyMember";
import UpdatePassword from "../../pages/general/UpdatePassword";
import HealthPackageList from "../../components/healthPackageList";
import YourPage from "../../pages/patients/health-packages/HealthPackageStatus";
import SubscribedPackageBenefits from "../../pages/patients/subscribedPackageBenefits";
import FamilyMemberPage from "../../pages/patients/FamilyMemberPage";
import ViewWallet from "../../pages/patients/wallet/ViewWallet";
import CreateWallet from "../../pages/patients/wallet/CreateWallet";
import PatientPaymentPage from "../../pages/patients/health-packages/HealthPackagePayment";
import FamilyMembersComponent from "../../pages/patients/FamilyMembers";
import HealthPackageDetailsPage from "../../pages/patients/health-packages/HealthPackagesOptions";
import AppointmentBooking from "../../pages/patients/appointments/AppointmentBooking";
import AppointmentPayment from "../../pages/patients/appointments/AppointmentsPayment";

export const patientDashboardRoute: Route = {
  path: "/patient/dashboard",
  element: <Home />,
};

export const familyMemberPageRoute: Route = {
  path: "/patient/family-member-page",
  element: <FamilyMemberPage />,
};

export const familyMembersRoute: Route = {
  path: "/patient/all-family-members",
  element: <FamilyMembersComponent />,
};

export const cancelSubscriptionRoute: Route = {
  path: "/patient/CancelSubscription",
  element: <YourPage />,
};
export const subscribedPackageBenefitsRoute: Route = {
  path: "/patient/subscribed-package-benefits",
  element: <SubscribedPackageBenefits />,
};
export const viewAllDoctorsRoute: Route = {
  path: "/patient/doctors",
  element: <ViewDoctors />,
};
export const viewDoctorDetailsRoute: Route = {
  path: "/patient/doctors/:doctorId",
  element: <ViewDoctorDetails />,
};
export const searchForDoctorsRoute: Route = {
  path: "/patient/doctors/search",
  element: <SearchForDoctors />,
};
export const addFamilyMemberRoute: Route = {
  path: "/patient/family-members/add",
  element: <AddFamilyMember />,
};

export const addRegisteredFamilyMemberRoute: Route = {
  path: `/patient/family-members/add-registered`,
  element: <AddRegisteredFamilyMember />,
};

export const patientFamilyMembersRoute: Route = {
  path: "/patient/family-members",
  element: <PatientRegisteredFamilyMembers />,
};
export const patientAppointmentsRoute: Route = {
  path: "/patient/appointments",
  element: <ViewAppointments />,
};
export const patientDoctorAppointmentDetailsRoute: Route = {
  path: "patient/appointment/:appointmentId",
  element: <ViewAppointments />,
};

export const patientPrescriptions: Route = {
  path: "/patient/prescriptions",
  element: <PrescriptionsPage />,
};

export const patientMedicalHistoryRoute: Route = {
  path: "/patient/medical-history",
  element: <MedicalHistory />,
};

export const patientUpdatePasswordRoute: Route = {
  path: "/patient/update-password",
  element: <UpdatePassword />,
};
export const healthPackagesOptionsRoute: Route = {
  path: "/patient/health-packages-options",
  element: <HealthPackageList />,
};
export const patientWalletRoute: Route = {
  path: "/patient/wallet",
  element: <ViewWallet />,
};

export const createPatientWalletRoute: Route = {
  path: "/patient/wallet/create",
  element: <CreateWallet />,
};

export const checkoutRoute: Route = {
  path: "/patient/payment",
  element: <PatientPaymentPage />,
};

export const healthPackageOptionsRDRoute: Route = {
  path: `/patient/Health-Packages-Options`,
  element: <HealthPackageDetailsPage />,
};

export const healthPackagePaymentRoute: Route = {
  path: `/patient/health-package/:packageId/payment`,
  element: <PatientPaymentPage />,
};

export const appointmentBookingRoute: Route = {
  path: "/patient/appointments/booking",
  element: <AppointmentBooking />,
};

export const appointmentPaymentRoute: Route = {
  path: "/patient/appointments/:doctorId/payment",
  element: <AppointmentPayment />,
};

const routes: Route[] = [
  patientDashboardRoute,
  viewAllDoctorsRoute,
  viewDoctorDetailsRoute,
  searchForDoctorsRoute,
  addFamilyMemberRoute,
  addRegisteredFamilyMemberRoute,
  patientFamilyMembersRoute,
  patientAppointmentsRoute,
  patientDoctorAppointmentDetailsRoute,
  patientPrescriptions,
  patientMedicalHistoryRoute,
  patientUpdatePasswordRoute,
  patientPrescriptions,
  patientMedicalHistoryRoute,
  healthPackagesOptionsRoute,
  cancelSubscriptionRoute,
  subscribedPackageBenefitsRoute,
  familyMembersRoute,
  familyMemberPageRoute,
  patientWalletRoute,
  createPatientWalletRoute,
  checkoutRoute,
  healthPackageOptionsRDRoute,
  healthPackagePaymentRoute,
  appointmentBookingRoute,
  appointmentPaymentRoute,
];

export default routes;
