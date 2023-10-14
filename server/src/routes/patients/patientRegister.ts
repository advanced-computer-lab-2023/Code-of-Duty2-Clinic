const express = require('express');

import { registerAsPatient } from "../../controllers/patients/patientRegisterController";
const patientRegisterRouter = express.Router();

patientRegisterRouter.post('/register', registerAsPatient);
export default patientRegisterRouter;