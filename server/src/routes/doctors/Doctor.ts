import express from 'express';
import { updateDoctor } from '../../controllers/doctors/updateDoctor';
import { getDoctor } from '../../controllers/doctors/getDoctor'
import { getAppointmentsWithAllPatients } from '../../controllers/doctors/getAllAppointments';
import { getRegisteredPatients } from '../../controllers/doctors/getRegisteredPatients';
import { getAppointmentDetails } from '../../controllers/doctors/getAppointmentDetails';
import { getDoctorById } from '../../controllers/patients/getDoctorById';
import getRegisteredPatientDetails from '../../controllers/doctors/getRegisteredPatientDetails';
import { addAvailableTimeSlotsForDoctor } from '../../controllers/doctors/addAvailableTimeSlots';
import { updateDoctorPassword } from '../../controllers/doctors/doctorUpdatePassword';

const doctorRouter = express.Router();

doctorRouter
.patch('/:doctorId/account', updateDoctor)

.get('/:id/allDetails', getDoctor)

.get('/:doctorId/patients', getRegisteredPatients)

.get('/:doctorId/patients/:patientId', getRegisteredPatientDetails)

.get('/:doctorId/appointments', getAppointmentsWithAllPatients)

.get('/:doctorId/appointments/:appointmentId', getAppointmentDetails)

.get('/:doctorId', getDoctorById)

.post('/:doctorId/appointments/availableTimeSlots', addAvailableTimeSlotsForDoctor)

.patch('/:doctorId/changePassword', updateDoctorPassword);



export default doctorRouter;
