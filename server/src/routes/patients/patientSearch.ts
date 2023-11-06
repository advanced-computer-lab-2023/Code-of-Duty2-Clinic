import express from 'express';
// const { searchPatientByName } = require('../../controllers/patients/patientSearchController');
import  {searchPatientByEmail, searchPatientByName, searchPatientByMobileNumber}  from '../../controllers/patients/patientSearchController'; 
const patientSearchRouter = express.Router();

patientSearchRouter.get('/search/name/:name', searchPatientByName);
patientSearchRouter.get('/search/email/:email', searchPatientByEmail);
patientSearchRouter.get('/search/mobile/:mobile', searchPatientByMobileNumber);

export default patientSearchRouter;