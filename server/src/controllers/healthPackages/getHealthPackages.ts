import { Request,Response } from "express";
import { findAllHealthPackages } from "../../services/health-packages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const getHealthPackages = async (req:AuthorizedRequest,res:Response)=>{
    try {
        res.json(await findAllHealthPackages());
    } catch(err){
        res.send(err)
    }
}