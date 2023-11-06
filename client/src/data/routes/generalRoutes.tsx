import PageNotFound from "../../pages/errors/PageNotFound";
import ServerNotAvailable from "../../pages/errors/ServerNotAvailable";
import { Route } from "../../types";

export const pageNotFoundRoute: Route = {
    path: '*',
    element: <PageNotFound />
};
export const serverNotAvailableRoute: Route = {
    path: '/server-not-available',
    element: <ServerNotAvailable />
};

const routes = [
    pageNotFoundRoute,
    serverNotAvailableRoute,
];

export default routes;
