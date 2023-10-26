import connectToDB from './configurations/database';
import config from './configurations/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import { authorizeUser } from './middlewares/authorization';
import { ROLE, applicationRoles } from './utils/userRoles';
import { authenticateUser } from './middlewares/authentication';

const app = express();

app.use(cors(config.server.corsOptions));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

useAllAppRoutes();

connectToDB();

app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.listen(config.server.port, async () => {
    console.log(`Server listening on port ${config.server.port}`);
});

function useAllAppRoutes() {
    const routesPath = path.resolve(__dirname, 'routes');
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
    const isRouterProtected = applicationRoles.includes(applicationEntities);
    if (isRouterProtected) {
        // protectRoute(applicationEntities, router);
    }
    app.use(`/api/${applicationEntities}`, router);
}

function protectRoute(applicationEntities: string, router: any) {
    console.log(applicationEntities);
    const authorizeUser = getRequiredAuthorizationMiddlewareType(applicationEntities);
    router.use(authenticateUser, authorizeUser);
}

function getRequiredAuthorizationMiddlewareType(applicationEntities: string): any {
    switch(applicationEntities) {
        case 'admins': 
            return authorizeUser(ROLE.ADMIN);
        case 'doctors': 
            return authorizeUser(ROLE.DOCTOR);
        case 'patients':
            return authorizeUser(ROLE.PATIENT);
        default:
            return null;
    }
}

