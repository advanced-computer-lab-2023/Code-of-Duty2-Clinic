import express from 'express';
import { updateDoctor } from '../../controllers/doctors/updateDoctor';
import { getDoctor } from '../../controllers/doctors/getDoctor'
import { getAppointmentsWithAllPatients } from '../../controllers/doctors/getAllAppointments';
import { getRegisteredPatients } from '../../controllers/doctors/getRegisteredPatients';
import { getAppointmentDetails } from '../../controllers/doctors/getAppointmentDetails';

const doctorRouter = express.Router();

doctorRouter.patch('/:doctorId/account', updateDoctor);

doctorRouter.get('/:id/allDetails',getDoctor)
doctorRouter.get('/:doctorId/patients', getRegisteredPatients)

doctorRouter.get('/:doctorId/appointments', getAppointmentsWithAllPatients);

doctorRouter.get('/:doctorId/appointments/:appointmentId', getAppointmentDetails);

export default doctorRouter;
