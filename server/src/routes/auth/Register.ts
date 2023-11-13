
import express from "express";
import { addDoctorRegistrationRequestFiles, getDoctorContract, registerAsDoctor } from "../../controllers/doctors/doctorRegisterController";
import { registerAsPatient } from "../../controllers/patients/patientRegisterController";
import { acceptDoctorRegistrationRequest } from "../../controllers/admins/actionOnRequest";

const registrationRouter = express.Router();

registrationRouter
.post('/registration', registerAsPatient)
.post('/doctor-registration', registerAsDoctor)


export default registrationRouter;