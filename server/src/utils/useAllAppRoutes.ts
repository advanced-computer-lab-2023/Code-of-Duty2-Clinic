import fs from "fs";
import path from "path";
import { app } from "..";

export function useAllAppRoutes(routesFolderPath: string) {
  useRoutesOfFolder(path.join(routesFolderPath, "admins"));
  useRoutesOfFolder(path.join(routesFolderPath, "doctors"));
  useRoutesOfFolder(path.join(routesFolderPath, "patients"));
  useRoutesOfFolder(path.join(routesFolderPath, "users"));
  useRoutesOfFolder(path.join(routesFolderPath, "auth"));
}

export function useRoutesOfFolder(routeFolderPath: string) {
  const applicationEntities = routeFolderPath.split(path.sep).pop()!;
  fs.readdirSync(routeFolderPath).forEach((routeFileName) => {
    useFileRouter(routeFolderPath, routeFileName, applicationEntities);
  });
}
function useFileRouter(
  innerRouteFolder: string,
  routeFileName: string,
  applicationEntities: string
) {
  const router = require(path.join(innerRouteFolder, routeFileName)).default;
  app.use(`/api/${applicationEntities}`, router);
}
