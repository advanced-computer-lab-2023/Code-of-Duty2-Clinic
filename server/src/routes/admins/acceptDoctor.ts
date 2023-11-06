import express from 'express';
import {acceptDoctorRegistrationRequest}  from '../../controllers/admins/actionOnRequest';

const router = express.Router();

router.post('/acceptDoctor/:username', acceptDoctorRegistrationRequest);

export default router;
