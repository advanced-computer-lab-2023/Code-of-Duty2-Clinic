import {StatusCodes} from 'http-status-codes'
import { Request, Response } from 'express';
import{addHealthRecord, deleteHealthRecord, getHealthRecords} from '../../services/patients/healthRecords'
import { AuthorizedRequest } from '../../types/AuthorizedRequest';

export const getPatientHealthRecords =async (req:AuthorizedRequest,res:Response)=>{ 
    if(!req.user?.id) return res.status(StatusCodes.BAD_REQUEST)
    try{
        res.status(StatusCodes.OK).json(await getHealthRecords(req.user.id))
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err)
    }
}

export const addPatientHealthRecord =async (req:AuthorizedRequest,res:Response)=>{ 
    if(!req.user?.id) return res.status(StatusCodes.BAD_REQUEST)
    try{
        res.status(StatusCodes.OK).json(await addHealthRecord(req.user.id,req.body.healthRecord))
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err)
    }
}
export const deletePatientHealthRecord =async (req:AuthorizedRequest,res:Response)=>{ 
    if(!req.user?.id) return res.status(StatusCodes.BAD_REQUEST)
    try{
        res.status(StatusCodes.OK).json(await deleteHealthRecord(req.user.id,req.body.healthRecord))
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err)
    }
}