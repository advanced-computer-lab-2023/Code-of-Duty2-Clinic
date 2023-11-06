import express from 'express';
import { setSubscribedPackageForDependent } from '../../controllers/patients/subscribeToPackageForIndependent';

const router = express.Router();

router.post('/subscribe/familymember', setSubscribedPackageForDependent);

export default router;
