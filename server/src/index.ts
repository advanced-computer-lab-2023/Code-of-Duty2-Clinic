import connectToDB from './config/database';
import config from './config/config';
import express from 'express';
import cors from 'cors';
import router from './routes/patientList';

const app = express();
app.use(cors());

app.use(router);
app.get('/', (req, res) => {
    res.send('Server Online!');
});

connectToDB();

app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
});
