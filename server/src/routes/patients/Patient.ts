import express from "express";
import { addFamilyMembers } from '../../controllers/patients/addFamilyMembers';
import { getDoctorById } from '../../controllers/patients/getDoctorById';
import { getAllDoctors } from '../../controllers/patients/getAllDoctors';

const patientRouter = express.Router();

patientRouter.get('/:patientId/doctors', getAllDoctors);

patientRouter.get('/doctors/:doctorId', getDoctorById);

patientRouter.post('/:patientId/family-members', addFamilyMembers);


export default patientRouter;