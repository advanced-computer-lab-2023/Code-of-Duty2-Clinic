import express from "express";
import { searchPatient } from "../../controllers/patients/patientSearchController";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserRole from "../../types/UserRole";

const patientSearchRouter = express.Router();

patientSearchRouter.use(authenticateUser);
patientSearchRouter.use(authorizeUser(UserRole.PATIENT));

patientSearchRouter.get("/search", searchPatient);

export default patientSearchRouter;
