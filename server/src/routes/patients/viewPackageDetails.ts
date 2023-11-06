import express from 'express';
import { viewHealthCarePackageStatus } from '../../controllers/patients/viewPackageDetails'; // Import your controller function

const router = express.Router();

router.get('/patients/:patientId/health-care-package-status', viewHealthCarePackageStatus);

export default router;