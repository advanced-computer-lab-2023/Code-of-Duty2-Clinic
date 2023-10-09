import express from 'express';
import { getDoctorRegistrationRequest } from '../controllers/viewDoctorApplicationData';

const router = express.Router();

// Route to get a doctor registration request by email
router.get('/doctor-registration-requests/:email', getDoctorRegistrationRequest);

export default router;