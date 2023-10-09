import express from 'express';
import {updateDoctor} from '../controllers/Doctor';

const doctorRouter = express.Router();

doctorRouter.patch('/doctors/:doctorId', updateDoctor);


export default doctorRouter;
