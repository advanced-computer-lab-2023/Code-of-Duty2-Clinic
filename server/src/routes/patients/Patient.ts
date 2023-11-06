import express from "express";
import { addFamilyMembers } from '../../controllers/patients/addFamilyMembers';
import { getDoctorById } from '../../controllers/patients/getDoctorById';
import { getAllDoctors } from '../../controllers/patients/getAllDoctors';
import { getPatientById } from '../../controllers/patients/getPatientById';
import { getPatientPrescriptions } from '../../controllers/patients/getPatientPrescriptions';
import { getPatientRegisteredFamilyMembers } from '../../controllers/patients/getPatientRegisteredFamilyMembers';
import { getAllPatients } from '../../controllers/patients/getAllPatients';
import { getPatientInfo } from '../../controllers/patients/getPatientInfo';
import { getAppointmentsWithAllDoctors } from "../../controllers/patients/getAllAppointments";
const patientRouter = express.Router();

patientRouter.get('/', getAllPatients);

patientRouter.get('/:patientId/doctors', getAllDoctors);

patientRouter.get('/:patientId/doctors/:doctorId', getDoctorById);

patientRouter.get('/:patientId/info', getPatientInfo);

patientRouter.post('/:patientId/family-members', addFamilyMembers);

patientRouter.get('/:patientId', getPatientById);

patientRouter.get('/:patientId/prescriptions', getPatientPrescriptions);

patientRouter.get('/:patientId/family-members', getPatientRegisteredFamilyMembers);

patientRouter.get('/:patientId/appointments', getAppointmentsWithAllDoctors);




export default patientRouter;