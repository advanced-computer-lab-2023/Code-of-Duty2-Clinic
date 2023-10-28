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
import patientRouter from './routes/patients/Patient';
import adminRouter from './routes/admins/Admin';

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
    app.use(`/api/${applicationEntities}`, router);
}

