import express from 'express';
import  {cancelSubscription}  from '../../controllers/patients/cancelSubscription';

const router = express.Router();

router.patch('/cancelSubscription/:patientId', cancelSubscription);

export default router;
