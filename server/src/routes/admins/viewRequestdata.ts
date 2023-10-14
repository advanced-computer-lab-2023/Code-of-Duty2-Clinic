import express from 'express';
import  getDoctorRegistrationRequest  from '../../controllers/admins/viewDoctorApplicationData';

const router = express.Router();

router.get('/doctor-registration-requests/:email', getDoctorRegistrationRequest);

export default router;