import { Response } from 'express';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { StatusCodes } from 'http-status-codes';
import Patient from '../../models/patients/Patient';

export const getPatientRegisteredFamilyMemberRequests = async (req: AuthorizedRequest, res: Response) => {
    const patientId = req.user?.id;

    const patient = await Patient.findById(patientId).select('registeredFamilyMemberRequests -_id');

    if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Patient not found' });
    }
    
    return res.status(StatusCodes.OK).send(patient.registeredFamilyMemberRequests);
};