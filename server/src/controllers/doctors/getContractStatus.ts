import { Response } from "express";
import Doctor from "../../models/doctors/Doctor";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const getContractStatus = async (req: AuthorizedRequest, res: Response)=>{
    try {
        const doctor = await Doctor.findById(req.user?.id);
        res.json(doctor?.contractStatus);
    } catch(err){
        if(err instanceof mongoose.Error.CastError)
            return res.status(StatusCodes.NOT_FOUND).send("Doctor Not found")
        return res.send(err)
    }
}
