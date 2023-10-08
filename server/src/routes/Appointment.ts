import express from 'express';
import {getAppointments,addAppointment} from '../controllers/Appointment';

const appointmentRouter = express.Router();

appointmentRouter.route("/appointments/").get(getAppointments).post(addAppointment);


export default appointmentRouter;
