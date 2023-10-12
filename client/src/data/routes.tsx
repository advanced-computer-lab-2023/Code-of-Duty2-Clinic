import { ReactElement } from "react";
import Home from "../pages/general/Home";
import HealthPackagesPage from "../pages/admins/HealthPackages";
import PrescriptionsPage from "../pages/patients/ViewPrescriptions";
import SignUp from "../pages/patients/SignUp";
import PageNotFound from "../pages/errors/PageNotFound";
import LogIn from "../pages/patients/LogIn";
import About from "../pages/general/About";
import ContactUs from "../pages/general/ContactUs";
import ServerNotAvailable from "../pages/errors/ServerNotAvailable";

interface Route {
    path: string;
    component: ReactElement;
}
const routes: Route[] = 
[
    {
        path: '/',
        component: <Home />
    },
    {
        path: '/login',
        component: <LogIn />
    },
    {
        path: '/signup',
        component: <SignUp />
    },
    {
        path: '/healthpackages',
        component: <HealthPackagesPage />
    },
    {
        path: '/prescriptions',
        component: <PrescriptionsPage />
    },
    {
        path: '/about',
        component: <About />
    },
    {
        path: '/contact-us',
        component: <ContactUs />
    },
    {
        path: '/page-not-found',
        component: <PageNotFound />
    },
    {
        path: '/server-not-available',
        component: <ServerNotAvailable />
    }
];

export default routes;
