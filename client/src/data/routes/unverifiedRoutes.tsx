import { Route } from "../../types";

export const doctorUnverifiedRoute: Route = {
  path: "/verify/doctor",
  element: <div>Doctor Verify</div>,
};

const unverifiedRoutes: Route[] = [doctorUnverifiedRoute];

export default unverifiedRoutes;
