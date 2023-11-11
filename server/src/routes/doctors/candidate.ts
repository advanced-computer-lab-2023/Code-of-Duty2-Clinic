
import express from "express";
import { addDoctorRegistrationRequestFiles, getDoctorContract, registerAsDoctor } from "../../controllers/doctors/doctorRegisterController";
import { registerAsPatient } from "../../controllers/patients/patientRegisterController";
import { acceptDoctorRegistrationRequest } from "../../controllers/admins/actionOnRequest";
import doctorRouter from "./Doctor";
import { authenticateUser } from "../../middlewares/authentication";
import UserRole from "../../types/UserRole";
import { authorizeUser } from "../../middlewares/authorization";



const registrationRouter = express.Router();
registrationRouter.use(authenticateUser);
registrationRouter.use(authorizeUser(UserRole.UNVERIFIED_DOCTOR));

registrationRouter
.put("/users/doctor-registration",addDoctorRegistrationRequestFiles)
.post('/users/accept-contract', acceptDoctorRegistrationRequest)
.get('/users/contract',getDoctorContract)

export default registrationRouter;