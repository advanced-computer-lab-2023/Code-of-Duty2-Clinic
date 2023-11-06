import { Route } from "../types";

/**
 * Returns the first path from an input route path.
 */
const getRouteFirstPath = (route: Route) => {
  const parts = route.path.split("/");
  return parts[1];
}

export default getRouteFirstPath;