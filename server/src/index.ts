import connectToDB from './utils/database';
import config from './configurations';
import express from 'express';
import cors from 'cors';
import { useAllAppRoutes } from './utils/useAllAppRoutes';

export const app = express();

app.use(cors(config.server.corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

useAllAppRoutes();

connectToDB();

app.get('/', (_, res) => {
    res.send('Server Online!');
});

app.listen(config.server.port, async () => {
    console.log(`Server listening on port ${config.server.port}`);
});