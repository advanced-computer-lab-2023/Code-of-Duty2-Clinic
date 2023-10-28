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
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import { ROLE } from "../../utils/userRoles";
const patientRouter = express.Router();

patientRouter.use(authenticateUser);
patientRouter.use(authorizeUser(ROLE.PATIENT));

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


export default patientRouter;