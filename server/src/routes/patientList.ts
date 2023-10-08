import express, { Request, Response } from 'express';
import { patientList } from '../controllers/patientList';

const router = express.Router();

router.get('/patientList', patientList);
export default router;
