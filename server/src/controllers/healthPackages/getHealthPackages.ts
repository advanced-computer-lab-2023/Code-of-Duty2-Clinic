import { Request,Response } from "express";
import { findAllHealthPackages } from "../../services/health-packages";

export const getHealthPackages = async (req:Request,res:Response)=>{
    try {
        res.json(await findAllHealthPackages());
    } catch(err){
        res.send(err)
    }
}