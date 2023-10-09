import express from "express";
import { addFamilyMembers } from '../controllers/patients/addFamilyMembers';
import { getDoctorById } from '../controllers/patients/getDoctorById';
import { getMatchingDoctors } from '../controllers/patients/getMatchingDoctors';
import { getAllDoctors } from '../controllers/patients/getAllDoctors';
import { getPatientById } from '../controllers/patients/getPatientById';
import { getPatientPrescriptions } from '../controllers/patients/getPatientPrescriptions';

const patientRouter = express.Router();

patientRouter.get('/patients/:id/doctors', getAllDoctors);

patientRouter.get('/patients/doctors', getMatchingDoctors);

patientRouter.get('/patients/doctors/:doctorId', getDoctorById);

patientRouter.post('/patients/:patientId/family-members', addFamilyMembers);

patientRouter.get('/patients/:patientId', getPatientById);

patientRouter.get('/patients/:patientId/prescriptions', getPatientPrescriptions);

export default patientRouter;