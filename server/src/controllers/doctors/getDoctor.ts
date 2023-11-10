import { Response } from "express";
import Doctor from "../../models/doctors/Doctor";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const getDoctor = async (req: AuthorizedRequest, res: Response)=>{
    try {
        const doctor = await Doctor.findOne({_id: req.user?.id, contractStatus: "accepted"})
        res.json(doctor)
    } catch(err){
        if(err instanceof mongoose.Error.CastError)
            return res.status(StatusCodes.NOT_FOUND).send("Doctor Not found")
        return res.send(err)
    }
}
