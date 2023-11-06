import express from "express";
import { addFamilyMembers } from '../../controllers/patients/addFamilyMembers';
import { getDoctorById } from '../../controllers/patients/getDoctorById';
import { getAllDoctors } from '../../controllers/patients/getAllDoctors';
import { getPatientById } from '../../controllers/patients/getPatientById';
import { getPatientRegisteredFamilyMembers } from '../../controllers/patients/getPatientRegisteredFamilyMembers';
import { getPatientInfo } from '../../controllers/patients/getPatientInfo';
import { getAppointmentsWithAllDoctors } from "../../controllers/patients/getAllAppointments";
import { getAllPrescriptions } from "../../controllers/prescriptions/getPrescriptions";
import { getPatientPrescriptions } from "../../controllers/prescriptions/getPatientPrescriptions";
import { updatePatientPassword } from "../../controllers/patients/patientUpdatePassword";
const patientRouter = express.Router();

patientRouter
.get('/:patientId/doctors', getAllDoctors)

.get('/:patientId/doctors/:doctorId', getDoctorById)

.get('/patient-info/:patientId', getPatientInfo)

.post('/:patientId/family-members', addFamilyMembers)

.get('/:patientId', getPatientById)

.get('/:patientId/prescriptions', getPatientPrescriptions)

.get('/:patientId/family-members', getPatientRegisteredFamilyMembers)

.get('/:patientId/appointments', getAppointmentsWithAllDoctors)

.get('', getAllPrescriptions)

.patch('/:patientId/changePassword', updatePatientPassword);


export default patientRouter;