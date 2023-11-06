import { Request, Response } from 'express';
import  Patient  from '../../models/patients/Patient';

export const viewSubscribedHealthPackage = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const patient = await Patient.findOne({ username });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const subscribedHealthPackage = patient.subscribedPackage;
        return res.status(200).json({ subscribedHealthPackage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
