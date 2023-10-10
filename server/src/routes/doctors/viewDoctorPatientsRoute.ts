import express from 'express';
import viewPatientHealthRecords from '../../controllers/doctors/viewDoctorPatientsController'; 

const router = express.Router();

// Define the route for fetching patients by doctor ID
router.get('/:doctorId/patients', viewPatientHealthRecords);

export default router;