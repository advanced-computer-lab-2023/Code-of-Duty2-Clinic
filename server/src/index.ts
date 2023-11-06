import connectToDB from './utils/database'; 
import config from './configurations';
import express from 'express';
import cors from 'cors';
import { useAllAppRoutes } from './utils/useAllAppRoutes';
import cookieParser from 'cookie-parser';
import path from 'path';

export const app = express();

app.use(cors(config.server.corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

useAllAppRoutes(path.resolve(__dirname, 'routes'));

connectToDB();

app.get('/', (_, res) => {
    res.send('Server Online!');
});

app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
});