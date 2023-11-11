import express from 'express';
import {acceptDoctorRegistrationRequest, sendContract}  from '../../controllers/admins/actionOnRequest';

const router = express.Router();


router.put('/accept-doctor/:doctorId', sendContract);


export default router;