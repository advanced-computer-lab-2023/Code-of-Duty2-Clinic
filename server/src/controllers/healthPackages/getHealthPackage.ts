import mongoose from "mongoose";
import { Request,Response } from "express";
import { findHealthPackageById } from "../../services/health-packages";

export const getHealthPackage = async (req:Request,res:Response)=>{
    try{
        const healthPackage = await findHealthPackageById(req.params.id)
        res.json(healthPackage)
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            res.send("Health Package Not found")
        return res.send(err)
    }
}