const express = require('express');
const { registerAsPatient} = require('../../controllers/patients/patientRegisterController');
const patientRegisterRouter = express.Router();

patientRegisterRouter.post('/register', registerAsPatient);
export default patientRegisterRouter;