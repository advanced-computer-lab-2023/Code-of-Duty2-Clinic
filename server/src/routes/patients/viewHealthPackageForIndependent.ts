import express from 'express';
import  {viewSubscribedPackage}  from '../../controllers/patients/viewHealthPackageIndependent';

const router = express.Router();

router.get('/HealthPackage/:patientId/:dependentNid', viewSubscribedPackage);

export default router;
