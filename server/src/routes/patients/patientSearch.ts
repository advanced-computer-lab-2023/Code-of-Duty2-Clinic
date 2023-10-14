import express from 'express';
// const { searchPatientByName } = require('../../controllers/patients/patientSearchController');
import  {searchPatientByName}  from '../../controllers/patients/patientSearchController';
const patientSearchRouter = express.Router();

patientSearchRouter.get('/search/:name', searchPatientByName);

export default patientSearchRouter;