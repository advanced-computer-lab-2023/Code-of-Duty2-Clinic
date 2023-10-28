import {StatusCodes} from 'http-status-codes'
import { Request, Response } from 'express';
import{addHealthRecord, deleteHealthRecord, getHealthRecords} from '../../services/patients/healthRecords'

export const getPatientHealthRecords =async (req:Request,res:Response)=>{ 
    try{
        res.status(StatusCodes.OK).json(await getHealthRecords(req.params.patientId))
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err)
    }
}

export const addPatientHealthRecord =async (req:Request,res:Response)=>{ 
    try{
        res.status(StatusCodes.OK).json(await addHealthRecord(req.params.patientId,req.body.healthRecord))
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err)
    }
}
export const deletePatientHealthRecord =async (req:Request,res:Response)=>{ 
    try{
        res.status(StatusCodes.OK).json(await deleteHealthRecord(req.params.patientId,req.body.healthRecord))
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err)
    }
}