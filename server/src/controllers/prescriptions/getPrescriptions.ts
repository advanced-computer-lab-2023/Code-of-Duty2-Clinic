import { Request, Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';


export const getAllPrescriptions= async (req: AuthorizedRequest, res: Response)=>{
    try {
        res.send(await Prescription.find());
    } catch(err) {
        res.send(err)
    }
}


