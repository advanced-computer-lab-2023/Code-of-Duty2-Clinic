import express from 'express';
import {rejectDoctorRegistrationRequest}  from '../../controllers/admins/actionOnRequest';

const router = express.Router();

router.post('/rejectDoctor/:username', rejectDoctorRegistrationRequest);

export default router;
