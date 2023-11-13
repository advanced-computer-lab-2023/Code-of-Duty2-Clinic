import express from "express";
import {
  addDoctorRegistrationRequestFiles,
  getDoctorContract,
  registerAsDoctor,
  rejectOffer,
} from "../../controllers/doctors/doctorRegisterController";
import { registerAsPatient } from "../../controllers/patients/patientRegisterController";
import { acceptDoctorRegistrationRequest, rejectDoctorRegistrationRequest } from "../../controllers/admins/actionOnRequest";
import doctorRouter from "../doctors/Doctor";
import { authenticateUser } from "../../middlewares/authentication";
import UserRole from "../../types/UserRole";
import { authorizeUser } from "../../middlewares/authorization";

const registrationRouter = express.Router();
registrationRouter.use(authenticateUser);
registrationRouter.use(authorizeUser(UserRole.UNVERIFIED_DOCTOR));

registrationRouter
  .put("/doctor-registration", addDoctorRegistrationRequestFiles)
  .post("/accept-contract", acceptDoctorRegistrationRequest)
  .post("/reject-contract", rejectOffer)
  .get("/contract", getDoctorContract);

export default registrationRouter;
