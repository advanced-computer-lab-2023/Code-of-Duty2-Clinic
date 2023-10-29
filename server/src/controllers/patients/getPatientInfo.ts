import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import { StatusCodes } from 'http-status-codes';


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

        res.status(StatusCodes.OK).json(patientInfo);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error getting patient by ID' });
    }
}