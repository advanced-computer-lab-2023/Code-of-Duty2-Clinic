import { Request, Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';


export const getAllPrescriptions= async (req:Request, res:Response)=>{
    try{
        res.send(await Prescription.find());
    }catch(err){
        res.send(err)
    }
}


