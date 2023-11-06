import Login from "../../pages/guest/Login";
import DoctorLogin from "../../pages/guest/DoctorLogin";
import { Route } from "../../types";

export const loginRoute: Route = {
  path: "/login",
  element: <Login />,
};

export const doctorLoginRoute: Route = {
  path: "/login/doctor",
  element: <DoctorLogin />,
};

const routes: Route[] = [loginRoute, doctorLoginRoute];

export default routes;
