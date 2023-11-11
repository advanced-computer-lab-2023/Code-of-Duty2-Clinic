import DoctorRegistrationRequestForm from "../../pages/doctors/Registration/DoctorRegistrationRequestForm";
import About from "../../pages/general/About";
import ContactUs from "../../pages/general/ContactUs";
import Home from "../../pages/general/Home";
import SignUp from "../../pages/patients/SignUp";
import { Route } from "../../types";

export const welcomeRoute: Route = {
  path: "/",
  element: <Home />,
};
export const patientSignUpRoute: Route = {
  path: "/signup",
  element: <SignUp />,
};
export const doctorSignUpRoute: Route = {
  path: "/signup/doctor",
  element: <DoctorRegistrationRequestForm />,
};
export const aboutRoute: Route = {
  path: "/about",
  element: <About />,
};
export const contactUsRoute: Route = {
  path: "/contact-us",
  element: <ContactUs />,
};

const routes: Route[] = [
  welcomeRoute,
  patientSignUpRoute,
  aboutRoute,
  contactUsRoute,
  doctorSignUpRoute
];

export default routes;
