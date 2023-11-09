import express from 'express';
import { viewSubscribedPackageForDependent } from '../../controllers/patients/viewPackageDetailsForDependent';

const router = express.Router();

// Define a route to view the subscribed package for a dependent family member
router.get('/viewSubscribedPackageForDependent', viewSubscribedPackageForDependent);

export default router;
