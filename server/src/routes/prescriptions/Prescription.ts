import { getAllPrescriptions, getPatientPrescriptions } from "../../controllers/prescriptionController";
import  express  from "express";

const router = express.Router();

router.get('/patient/:patientId',getPatientPrescriptions)
router.get('',getAllPrescriptions)


export default router