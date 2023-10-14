import {getPatientPrescriptions} from "../../controllers/prescriptions/getPatientPrescriptions";
import {getAllPrescriptions} from "../../controllers/prescriptions/getPrescriptions";

import  express  from "express";

const router = express.Router();

router.get('/patient/:patientId',getPatientPrescriptions)
router.get('',getAllPrescriptions)


export default router