import { Route } from "./Route";
import HealthPackagesPage from "../../pages/admins/HealthPackages";

export const HealthPackagesRoute :Route ={
    path:"/admin/healthPackages" ,
    component:<HealthPackagesPage/>
}
const routes: Route[] = [
    HealthPackagesRoute
];

export default routes;