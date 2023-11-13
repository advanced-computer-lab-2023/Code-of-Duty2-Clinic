import express from "express";
import {
  addDoctorRegistrationRequestFiles,
  getDoctorContract,
} from "../../controllers/doctors/doctorRegisterController";
import { acceptDoctorRegistrationRequest } from "../../controllers/admins/actionOnRequest";
import { authenticateUser } from "../../middlewares/authentication";
import UserRole from "../../types/UserRole";
import { authorizeUser } from "../../middlewares/authorization";

const registrationRouter = express.Router();
registrationRouter.use(authenticateUser);
registrationRouter.use(authorizeUser(UserRole.UNVERIFIED_DOCTOR));

registrationRouter
  .put("/doctor-registration", addDoctorRegistrationRequestFiles)
  .post("/accept-contract", acceptDoctorRegistrationRequest)
  .get("/contract", getDoctorContract);

export default registrationRouter;
