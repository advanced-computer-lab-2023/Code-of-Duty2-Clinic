import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import StatusCodes from 'http-status-codes';

export const getPatientById = async (req: Request, res: Response) => {
    const id = req.params.patientId;
    const patient = await Patient.findById(id);
    
    if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'No such patient found' });
    } else {
        return res.status(StatusCodes.OK).json(patient);
    }
};
