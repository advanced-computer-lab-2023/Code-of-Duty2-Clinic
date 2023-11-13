import express from 'express';
import { updateDoctor } from '../../controllers/doctors/updateDoctor';
import { getDoctor } from '../../controllers/doctors/getDoctor'
import { getAppointmentsWithAllPatients } from '../../controllers/doctors/getAllAppointments';
import { getRegisteredPatients } from '../../controllers/doctors/getRegisteredPatients';
import { getAppointmentDetails } from '../../controllers/doctors/getAppointmentDetails';
import { getDoctorById } from '../../controllers/patients/getDoctorById';
import getRegisteredPatientDetails from '../../controllers/doctors/getRegisteredPatientDetails';
import { addDoctorAvailableSlots } from '../../controllers/doctors/addAvailableTimeSlots';
import { updateDoctorPassword } from '../../controllers/doctors/doctorUpdatePassword';
import { UserRole } from "../../types/UserRole";
import { authorizeUser } from '../../middlewares/authorization';
import { authenticateUser } from '../../middlewares/authentication';
import { getPatientInfo } from '../../controllers/patients/getPatientInfo';
import { getAllPatients } from '../../controllers/patients/getAllPatients';
import { scheduleFollowUp } from '../../controllers/doctors/doctorFollowUp';
import { viewAvailableTimeSlots } from '../../controllers/doctors/getAvailableTimeSlots';

const doctorRouter = express.Router();

doctorRouter.use(authenticateUser);
doctorRouter.use(authorizeUser(UserRole.DOCTOR));

doctorRouter
.patch('/account', updateDoctor)

.get('/patients', getAllPatients)

.get('/allDetails', getDoctor)

.get('/patients', getRegisteredPatients)

.get('/patients/:patientId', getRegisteredPatientDetails)

.get('/appointments', getAppointmentsWithAllPatients)

.get('/appointments/:appointmentId', getAppointmentDetails)

.get('', getDoctorById)

.post('/appointments/add-time-slots', addDoctorAvailableSlots)

.patch('/change-password', updateDoctorPassword)

.post('/appointments/follow-up', scheduleFollowUp)

.get('/available-time-slots', viewAvailableTimeSlots)



export default doctorRouter;
