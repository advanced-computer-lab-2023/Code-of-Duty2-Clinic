import connectToDB from './config/database';
import config from './config/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
// const patientRegisterRouter = require('../src/routes/patients/patientRegister');
// const patientSearchRouter = require('./routes/patients/patientSearch');
// const doctorRegisterRouter = require('./src/routes/doctors/doctorRegister');



const app = express();

app.use(express.json());

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors(config.server.corsOptions));

useAllAppRoutes();

connectToDB();

app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.listen(config.server.port, async () => {
    console.log(`Server listening on port ${config.server.port}`);
});

// app.use('/register', patientRegisterRouter);
// app.use('/search', patientSearchRouter);
// app.use('/register', doctorRegisterRouter);


function useAllAppRoutes() {
    const routesPath = path.resolve(__dirname, 'routes');
    fs.readdirSync(routesPath).forEach((folderName) => {
        const innerRouteFolder = path.join(routesPath, folderName);
        const applicationEntities = folderName;
        fs.readdirSync(innerRouteFolder).forEach((routeFileName) => {

            
            
            const route = require(path.join(innerRouteFolder, routeFileName)).default;
            
            app.use(`/api/${applicationEntities}`, route);
        });
    });
}



  
