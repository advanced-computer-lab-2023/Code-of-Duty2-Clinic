import fs from 'fs';
import path from 'path';
import { app } from '..';

export function useAllAppRoutes(routesPath: string) {
    fs.readdirSync(routesPath).forEach((folderName) => {
        const innerRouteFolder = path.join(routesPath, folderName);
        const applicationEntities = folderName;
        fs.readdirSync(innerRouteFolder).forEach((routeFileName) => {
            useFileRouter(innerRouteFolder, routeFileName, applicationEntities);
        });
    });
}
function useFileRouter(innerRouteFolder: string, routeFileName: string, applicationEntities: string) {
    const router = require(path.join(innerRouteFolder, routeFileName)).default;
    app.use(`/api/${applicationEntities}`, router);
}
