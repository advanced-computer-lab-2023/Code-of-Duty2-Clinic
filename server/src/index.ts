import connectToDB from './config/database';
import config from './config/config';
import express from 'express';
import cors from 'cors';
import healthPackageRouter from './routes/healthPackageRouter'
import doctorRouter from './routes/doctorRouter'
import prescriptionRouter from './routes/prescriptionRouter'
// import fs from 'fs';
// import path from 'path';
// import bodyParser from 'body-parser';

const app = express();

app.use(cors(config.server.corsOptions));
app.use(express.json())


connectToDB();

app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.use('/prescription',prescriptionRouter)
app.use('/healthPackage',healthPackageRouter)
app.use('/doctor',doctorRouter)


app.listen(config.server.port, async () => {
    console.log(`Server listening on port ${config.server.port}`);
});

