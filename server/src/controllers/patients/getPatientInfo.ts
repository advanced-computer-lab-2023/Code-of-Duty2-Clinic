import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';


export const getPatientInfo = async (req: Request, res: Response) => {
    const patientId = req.params.patientId;

    try {
        const patient = await Patient.findById(patientId);

        const patientInfo = {
            name: patient?.name,
            dateOfBirth: patient?.dateOfBirth,
            email: patient?.email,
            gender: patient?.gender,
            mobileNumber: patient?.mobileNumber,
        }

        res.status(200).json(patientInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error getting patient by ID' });
    }
}