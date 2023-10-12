import About from "../../pages/general/About";
import ContactUs from "../../pages/general/ContactUs";
import Home from "../../pages/general/Home";
import LogIn from "../../pages/patients/LogIn";
import SignUp from "../../pages/patients/SignUp";
import { Route } from "./Route";

export const homeRoute: Route = {
    path: '/',
    component: <Home />
};
export const patientLoginRoute: Route = {
    path: '/login',
    component: <LogIn />
};
export const patientSignUpRoute: Route = {
    path: '/signup',
    component: <SignUp />
};
export const aboutRoute: Route = {
    path: '/about',
    component: <About />
};
export const contactUsRoute: Route = {
    path: '/contact-us',
    component: <ContactUs />
};

const routes: Route[] = 
[
    homeRoute,
    patientLoginRoute,
    patientSignUpRoute,
    aboutRoute,
    contactUsRoute,
];

export default routes;
