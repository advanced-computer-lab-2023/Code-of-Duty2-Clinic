import express from 'express';
import {updateDoctor} from '../controllers/Doctor';

const doctorRouter = express.Router();

doctorRouter.patch('/doctors/:id', updateDoctor);


export default doctorRouter;
