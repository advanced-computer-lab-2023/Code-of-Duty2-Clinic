import express from 'express';
import { updateDoctor } from '../../controllers/doctors/updateDoctor';
import { getDoctor } from '../../controllers/doctors/getDoctor'

const doctorRouter = express.Router();

doctorRouter.patch('/:doctorId/account', updateDoctor);

doctorRouter.get('/:id/allDetails',getDoctor)

export default doctorRouter;
