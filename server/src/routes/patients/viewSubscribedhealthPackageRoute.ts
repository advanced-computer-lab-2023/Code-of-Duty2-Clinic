import express from 'express';
import  {viewSubscribedHealthPackage}  from '../../controllers/patients/viewSubscribedHealthPackage';

const router = express.Router();

router.get('/HealthPackage/:username', viewSubscribedHealthPackage);

export default router;
