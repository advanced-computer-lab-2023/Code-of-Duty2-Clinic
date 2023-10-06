import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;
const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:5137";

const config = {
    mongo: {
        config: MONGO_URI
    },
    server: {
        port: SERVER_PORT
    },
    FRONT_END_URL: FRONT_END_URL
};

export default config;