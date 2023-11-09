import express from 'express';
import { viewHealthPackagesOptions } from '../../controllers/patients/viewHealthPackagesOptions';

const router = express.Router();

router.get('/healthPackages', viewHealthPackagesOptions);

export default router;
