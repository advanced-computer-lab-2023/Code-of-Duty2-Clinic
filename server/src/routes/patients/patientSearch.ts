import express from 'express';
import { searchPatient } from '../../controllers/patients/patientSearchController';

const patientSearchRouter = express.Router();

patientSearchRouter.get('/search', searchPatient);

export default patientSearchRouter;