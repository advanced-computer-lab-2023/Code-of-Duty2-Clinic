import connectToDB from './config/database';
import config from './config/config';
import express from 'express';
import cors from 'cors';
import healthPackageRouter from './routes/healthPackageRouter'
import doctorRouter from './routes/doctorRouter'
import prescriptionRouter from './routes/prescriptionRouter'

const app = express();


app.use(cors(config.server.corsOptions));
app.use(express.json())

connectToDB()
app.get('/', (req, res) => {
    res.send('Server Online!');
});


app.use("/doctor",doctorRouter)
app.use("/healthPackage",healthPackageRouter)
app.use('prescription',prescriptionRouter)

app.listen(process.env.PORT, async () => {
    console.log(`Server listening on port ${config.server.port}`);
});
