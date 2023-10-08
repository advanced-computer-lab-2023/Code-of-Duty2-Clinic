import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;
const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:5173";
const corsOptions: cors.CorsOptions = {
    origin: FRONT_END_URL
};


const config = {
    mongo: {
        uri: MONGO_URI
    },
    server: {
        port: SERVER_PORT,
        corsOptions,
    },
    FRONT_END_URL: FRONT_END_URL
};

export default config;