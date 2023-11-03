import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findAllPatients } from '../../services/patients';

export const getAllPatients = async (req: Request, res: Response) => {
    const patients = await findAllPatients();
    res.status(StatusCodes.OK).json(patients);
}
   

