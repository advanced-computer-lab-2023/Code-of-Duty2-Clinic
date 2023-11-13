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
import { getPatientRegisteredFamilyMemberById } from "../../controllers/patients/getPatientRegisteredFamilyMemberById";
import { addPatientHealthRecord, deletePatientHealthRecord, getPatientHealthRecords } from "../../controllers/patients/healthRecords";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import { UserRole } from "../../types/UserRole";
import { addPatientRegisteredFamilyMember, deletePatientRegisteredFamilyMember, rejectPatientRegisteredFamilyMember } from "../../controllers/patients/patientRegisteredFamilyMemberController";
import { getPatientRegisteredFamilyMemberRequests } from "../../controllers/patients/getPatientRegisteredFamilyMemberRequests";
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

.get('/family-members/requests', getPatientRegisteredFamilyMemberRequests)

.get('/family-members/:familyMemberId', getPatientRegisteredFamilyMemberById)

.post('/family-members/registered', addPatientRegisteredFamilyMember)

.delete('/family-members/registered', deletePatientRegisteredFamilyMember)

.post('/family-members/requests/:familyMemberId/reject', rejectPatientRegisteredFamilyMember)

.get('/appointments', getAppointmentsWithAllDoctors)

.get('prescriptions', getAllPrescriptions)

.get('/health-records', getPatientHealthRecords)

.put('/health-records', addPatientHealthRecord)

.delete('/health-records', deletePatientHealthRecord)

.get('/appointments', getAppointmentsWithAllDoctors)

.get('/:patientId', getPatientById)

export default patientRouter;