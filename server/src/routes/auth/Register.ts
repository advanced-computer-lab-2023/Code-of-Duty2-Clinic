const express = require('express');

import { registerAsDoctor } from "../../controllers/doctors/doctorRegisterController";
import { registerAsPatient } from "../../controllers/patients/patientRegisterController";
const registrationRouter = express.Router();

registrationRouter
.post('/registration', registerAsPatient)
.post('/doctor-registration', registerAsDoctor);

export default registrationRouter;