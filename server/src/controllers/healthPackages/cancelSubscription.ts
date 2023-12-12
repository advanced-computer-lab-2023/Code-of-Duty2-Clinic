import { Request, Response } from 'express';
import  Patient  from '../../models/patients/Patient';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { cancelSubscriptionService } from '../../services/patients';

export const cancelSubscription = async (req: AuthorizedRequest, res: Response) => {
    const patientId = req.user?.id!;    
    try{    
    if(patientId){
            await cancelSubscriptionService(patientId);
            return res.status(200).json({ message: 'Subscription cancelled successfully' });
        }
        else {
            return res.status(400).json({ message: 'Patient has no subscribed package' });
        } 
    }catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
