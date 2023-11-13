import Applications from "../../pages/doctors/Registration/applications";
import { Route } from "../../types";

export const doctorUnverifiedRoute: Route = {
  path: "/career-dashboard/applications",
  element: <Applications />,
};

const unverifiedRoutes: Route[] = [doctorUnverifiedRoute];

export default unverifiedRoutes;
