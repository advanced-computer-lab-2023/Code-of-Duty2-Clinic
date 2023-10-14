import express from 'express';
// const  registerAsDoctor  = require('../../controllers/doctors/doctorRegisterController');
import { registerAsDoctor } from '../../controllers/doctors/doctorRegisterController';
const doctorRegisterRouter = express.Router();

doctorRegisterRouter.post('/', registerAsDoctor);

export default doctorRegisterRouter;