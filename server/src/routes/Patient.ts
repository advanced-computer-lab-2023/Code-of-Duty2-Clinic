import express from "express";
import { getAllDoctors, getDoctorById, getMatchingDoctors, addFamilyMembers } from "../controllers/Patient";

const patientRouter = express.Router();

patientRouter.get('/patients/:id/doctors', getAllDoctors);

patientRouter.get('/patients/doctors', getMatchingDoctors);

patientRouter.get('/patients/doctors/:doctorId', getDoctorById);

patientRouter.post('/patients/:patientId/family-members', addFamilyMembers);


export default patientRouter;