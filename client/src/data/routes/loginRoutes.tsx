import Login from "../../pages/guest/Login";
import DoctorLogin from "../../pages/guest/DoctorLogin";
import { Route } from "../../types";
import ForgetPassword from "../../pages/guest/forget-password/ForgetPassword";

export const loginRoute: Route = {
  path: "/login",
  element: <Login />,
};

export const doctorLoginRoute: Route = {
  path: "/login/doctor",
  element: <DoctorLogin />,
};

export const forgetPasswordRoute: Route = {
  path: "/forget-password",
  element: <ForgetPassword />,
};

const routes: Route[] = [loginRoute, doctorLoginRoute, forgetPasswordRoute];

export default routes;
