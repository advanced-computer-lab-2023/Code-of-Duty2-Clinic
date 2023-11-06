import { Request, Response } from 'express';
import  Patient  from '../../models/patients/Patient';

export const cancelSubscription = async (req: Request, res: Response) => {
    const { patientId } = req.params;

    try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        if (patient.subscribedPackage) {
            patient.subscribedPackage.status = 'cancelled';
            patient.subscribedPackage.endDate = new Date();
            await patient.save();
            return res.status(200).json({ message: 'Subscription cancelled successfully' });
        } 
        else {
            return res.status(400).json({ message: 'Patient has no subscribed package' });
        }
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
       
};
