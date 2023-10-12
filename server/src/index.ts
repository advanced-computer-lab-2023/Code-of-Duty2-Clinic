import connectToDB from './config/database';
import config from './config/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import DoctorRegistrationRequest, { DoctorRegistrationRequestSchema } from './models/doctors/DoctorRegistrationRequest';
import Patient, { PatientSchema } from './models/patients/Patient';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors(config.server.corsOptions));

useAllAppRoutes();

connectToDB();

app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.listen(config.server.port, async () => {
    console.log(`Server listening on port ${config.server.port}`);
});

async function useAllAppRoutes() {
    const routesPath = path.resolve(__dirname, 'routes');
    fs.readdirSync(routesPath).forEach((folderName) => {
        const innerRouteFolder = path.join(routesPath, folderName);
        const applicationEntities = folderName;
        fs.readdirSync(innerRouteFolder).forEach((routeFileName) => {
            const route = require(path.join(innerRouteFolder, routeFileName)).default;
            app.use(`/api/${applicationEntities}`, route);
        });
    });
    // const user=await DoctorRegistrationRequest.find();
    // console.log(user)
}