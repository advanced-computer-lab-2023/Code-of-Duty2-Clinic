import Home from "../../pages/doctors/Home";
import UpdateAccountInfo from "../../pages/doctors/UpdateAccountInfo";
import { Route } from "./Route";


export const doctorHomeRoute: Route = {
    path: '/doctor/home',
    component: <Home />
}

export const updateAccountInfoRoute: Route = {
    path: '/doctor/:doctorId/account/update',
    component: <UpdateAccountInfo />
}


const routes: Route[] = [
    doctorHomeRoute,
    updateAccountInfoRoute,
];

export default routes;