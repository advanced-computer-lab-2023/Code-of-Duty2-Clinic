import connectToDB from './config/database';
import config from './config/config';
import express, { Request, NextFunction, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import Patient from './models/patients/Patient';
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

function useAllAppRoutes() {
    const routesPath = path.resolve(__dirname, 'routes');

    fs.readdirSync(routesPath).forEach((file) => {
        const route = require(path.join(routesPath, file));
        console.log(file);
        app.use('/', route.default);
    });
}
