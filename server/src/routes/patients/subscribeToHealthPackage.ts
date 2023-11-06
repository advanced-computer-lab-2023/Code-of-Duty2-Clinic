import express from 'express';
import { subscribeToHealthPackage } from '../../controllers/patients/subscribePackageOfPatient';

const router = express.Router();

router.post('/subscribe/:patientId', subscribeToHealthPackage);

export default router;
