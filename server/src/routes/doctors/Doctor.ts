import express from 'express';
import { updateDoctor } from '../../controllers/doctors/updateDoctor';

const doctorRouter = express.Router();

doctorRouter.patch('/:doctorId', updateDoctor);


export default doctorRouter;
