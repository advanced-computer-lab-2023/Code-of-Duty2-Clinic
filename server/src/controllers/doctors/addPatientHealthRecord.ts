import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import allAttributesExist from "../../utils/attributeExistanceChecker";
import { Response } from "express";
import { addHealthRecord } from "../../services/patients/healthRecords";

export const doctorAddPatientHealthRecord = async (req:AuthorizedRequest,res:Response)=>{
    if(!req.user?.id) return res.status(StatusCodes.BAD_REQUEST).send('User id is null');
    const healthRecordAttributes =['url','fileType','recordType','createdAt']
    if(!req.params.patientId||!allAttributesExist(healthRecordAttributes,Object.keys(req.body))) return res.status(StatusCodes.BAD_REQUEST).send("Attributes missing")

    try{
        res.status(StatusCodes.OK).json(await addHealthRecord(req.params.patientId,req.body))
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).send(err)
    }
}