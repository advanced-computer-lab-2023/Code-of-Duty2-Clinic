import { Request, Response } from "express";
import Doctor from "../../models/doctors/Doctor";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
//Get a doctor with accpeted contract by ID  
export const getDoctor = async (req:Request, res:Response)=>{
    try{
        const doctor = await Doctor.find({_id:req.params.id, contractStatus:"accepted"})
        res.json(doctor)
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            return res.status(StatusCodes.NOT_FOUND).send("Doctor Not found")
        return res.send(err)
    }
}
