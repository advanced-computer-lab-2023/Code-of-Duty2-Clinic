import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';

export const getPatientDependentFamilyMembers = async (req: AuthorizedRequest, res: Response) => {
    try {
        const patientId = req.user?.id;
        console.log(patientId);
        const patient = await Patient.findById(patientId).select('dependentFamilyMembers');
        console.log(patient);
        const dependentFamilyMembers = patient!.dependentFamilyMembers;
        console.log(dependentFamilyMembers);
        res.status(StatusCodes.OK).json(dependentFamilyMembers);
    } catch (error: any) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
