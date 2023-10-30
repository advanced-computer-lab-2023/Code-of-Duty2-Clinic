import mongoose from "mongoose";
import { Request,Response } from "express";
import { deleteHealthPackage } from "../../services/health-packages";


export const deleteHealthPackageHandler = async (req: Request, res: Response)=>{
    try {
        const deleteResponse = await deleteHealthPackage(req.params.id);

        if(deleteResponse.deletedCount == 0){
            res.send('This package does not exist')
        }else{
            res.send('Package Deleted Succesfully')
        }
    } catch(err) {
        if(err instanceof mongoose.Error.CastError)
            return res.send("Health Package Not found")

        return res.send(err)
    }
   
}