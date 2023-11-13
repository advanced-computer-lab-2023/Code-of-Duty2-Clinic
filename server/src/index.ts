import connectToDB from "./utils/database";
import config from "./configurations";
import express from "express";
import cors from "cors";
import { useAllAppRoutes } from "./utils/useAllAppRoutes";
import cookieParser from "cookie-parser";
import path from "path";
import patientRouter from "./routes/patients/Patient";
import HealthPackage from "./models/health_packages/HealthPackage";

export const app = express();

app.use(cors(config.server.corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

useAllAppRoutes(path.resolve(__dirname, "routes"));

connectToDB();/*6539a755196f8c5912844415*/

app.get("/", (_, res) => {
  res.send("Server Online!");
});

app.listen(config.server.port, async () => {
  console.log(`Server listening on port ${config.server.port}`);
  const req=await HealthPackage.find();
  console.log(req);
});
