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
import { addPatientHealthRecord, deletePatientHealthRecord, getPatientHealthRecords } from "../../controllers/patients/healthRecords";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import { UserRole } from "../../types/UserRole";
import { selectAppointment } from "../../controllers/patients/selectAppointmentTime";

const patientRouter = express.Router();

patientRouter.use(authenticateUser);
patientRouter.use(authorizeUser(UserRole.PATIENT));

patientRouter
.get('/doctors', getAllDoctors)

.get('/doctors/:doctorId', getDoctorById)

.get('/patient-info', getPatientInfo)

.post('/family-members', addFamilyMembers)

.get('', getPatientById)

.get('/prescriptions', getPatientPrescriptions)

.get('/family-members', getPatientRegisteredFamilyMembers)

.get('/appointments', getAppointmentsWithAllDoctors)

.get('prescriptions', getAllPrescriptions)

.patch('/change-password', updatePatientPassword)

.get('/health-records', getPatientHealthRecords)

.put('/health-records', addPatientHealthRecord)

.delete('/health-records', deletePatientHealthRecord)

.get('/family-members', getPatientRegisteredFamilyMembers)

.get('/appointments', getAppointmentsWithAllDoctors)

.post('/appointments/select-time', selectAppointment)

export default patientRouter;