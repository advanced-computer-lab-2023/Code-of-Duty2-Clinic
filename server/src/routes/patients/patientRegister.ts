const express = require('express');
// const { registerAsPatient } = require('../../controllers/patients/patientRegisterController.ts');
import { registerAsPatient } from "../../controllers/patients/patientRegisterController";
const patientRegisterRouter = express.Router();

patientRegisterRouter.post('/register', registerAsPatient);
export default patientRegisterRouter;