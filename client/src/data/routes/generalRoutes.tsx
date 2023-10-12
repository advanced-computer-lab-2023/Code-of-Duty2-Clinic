import PageNotFound from "../../pages/errors/PageNotFound";
import ServerNotAvailable from "../../pages/errors/ServerNotAvailable";
import { Route } from "./Route";

export const pageNotFoundRoute: Route = {
    path: '/page-not-found',
    component: <PageNotFound />
};
export const serverNotAvailableRoute: Route = {
    path: '/server-not-available',
    component: <ServerNotAvailable />
};

const routes = [
    pageNotFoundRoute,
    serverNotAvailableRoute,
];

export default routes;
