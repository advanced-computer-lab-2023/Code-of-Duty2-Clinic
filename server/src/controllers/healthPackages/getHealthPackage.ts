import mongoose from "mongoose";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { Request,Response } from "express";

export const getHealthPackage = async (req:Request,res:Response)=>{
    try{
        const healthPackage = await HealthPackage.findById(req.params.id)
        res.json(healthPackage)
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            res.send("Health Package Not found")
        return res.send(err)
    }
}