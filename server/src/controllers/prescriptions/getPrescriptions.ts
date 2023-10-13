import { Request, Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';
import Patient from '../../models/patients/Patient';
import Doctor from '../../models/doctors/Doctor';
import { StatusCodes } from 'http-status-codes';


export const getAllPrescriptions= async (req:Request, res:Response)=>{
    try{
        res.send(await Prescription.find());

    }catch(err){
        res.send(err)
    }
}


