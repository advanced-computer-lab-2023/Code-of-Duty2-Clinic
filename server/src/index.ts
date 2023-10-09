import connectToDB from './config/database';
import config from './config/config';
import express, { Request, NextFunction, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import Doctor from './models/doctors/Doctor';
import Patient from './models/patients/Patient';
import HealthPackage from './models/health_packages/HealthPackage';
import Admin from './models/admins/Admin';
import Prescription from './models/prescriptions/Prescription';

const app = express();

const adminRouter=require('../src/routes/addAdmin')
const removeRouter=require('../src/routes/removeUser')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors(config.server.corsOptions));


connectToDB();


app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.listen(config.server.port, async () => {
    console.log(`Server listening on port ${config.server.port}`);
});

app.use(adminRouter)
app.delete(removeRouter)



// function useAllAppRoutes() {
//     const routesPath = path.resolve(__dirname, 'Routes');

//     fs.readdirSync(routesPath).forEach((file) => {
//         const route = require(path.join(routesPath, file));
//         app.use(route.default);
//     });

