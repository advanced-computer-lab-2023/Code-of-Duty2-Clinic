import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "" ;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:5173";
const corsOptions: cors.CorsOptions = {};


const config = {
    mongo: {
        uri: MONGO_URI
    },
    server: {
        port: SERVER_PORT,
        corsOptions,
        accessTokenSecret: ACCESS_TOKEN_SECRET,
        refreshTokenSecret: REFRESH_TOKEN_SECRET,
    },
    FRONT_END_URL: FRONT_END_URL
};

export default config;