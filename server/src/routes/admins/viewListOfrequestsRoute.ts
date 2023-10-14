import express from 'express';
import getDoctorRegistrationRequests from '../../controllers/admins/viewListOfRequests';

const router = express.Router();

router.get('/doctor-registration-requests', getDoctorRegistrationRequests);

export default router;