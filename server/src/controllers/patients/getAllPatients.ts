import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Patient from '../../models/patients/Patient';

export const getAllPatients = async (req: Request, res: Response) => {
    const patients = await Patient.find();
    res.status(StatusCodes.OK).json(patients);
}
   

