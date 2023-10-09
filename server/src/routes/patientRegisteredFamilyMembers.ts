import express, { Request, Response } from 'express';
import { getPatientRegisteredFamilyMembers } from '../controllers/patients/getPatientRegisteredFamilyMembers';

const router = express.Router();

router.get('/patientRegisteredFamilyMembers/:patientId', getPatientRegisteredFamilyMembers);
export default router;
