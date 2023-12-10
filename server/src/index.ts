import connectToDB from "./utils/database";
import config from "./configurations";
import express from "express";
import cors from "cors";
import { useAllAppRoutes } from "./utils/useAllAppRoutes";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { authenticateSocketConnection } from "./middlewares/authentication";
import addSocketEventListeners from "./socket-connections";

export const app = express();

app.use(cors(config.server.corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

useAllAppRoutes(path.resolve(__dirname, "routes"));

connectToDB();

app.get("/", (_, res) => {
  res.send("Server Online!");
});

app.listen(config.server.port, async () => {
  console.log(`Server listening on port ${config.server.port}`);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: config.server.corsOptions,
});
io.use(authenticateSocketConnection);
io.on("connection", addSocketEventListeners);

server.listen(config.server.socketPort, () => {
  console.log(`Socket server listening on port ${config.server.socketPort}`);
});
