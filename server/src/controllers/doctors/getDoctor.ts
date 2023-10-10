import { Request, Response } from "express";
import Doctor from "../../models/doctors/Doctor";
import mongoose from "mongoose";
//Get doctor by ID 
export const getDoctor = async (req:Request,res:Response)=>{
    try{
        const doctor = await Doctor.findById(req.params.id)
        res.json(doctor)
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            return res.status(404).send("Doctor Not found")
        return res.send(err)
    }
}
