import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { findPatientById } from '../../services/patients';

export const getPatientById = async (req: Request, res: Response) => {
    const id = req.params.patientId;
    const patient = await findPatientById(id, '+name');
    
    if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'No such patient found' });
    } else {
        return res.status(StatusCodes.OK).json(patient);
    }
};
