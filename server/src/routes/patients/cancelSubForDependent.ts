import express from 'express';
import  {cancelSubscribedForDependent}  from '../../controllers/patients/cancelSubForIndependent';

const router = express.Router();

router.patch('/cancelSubscriptionforDependent', cancelSubscribedForDependent);

export default router;
