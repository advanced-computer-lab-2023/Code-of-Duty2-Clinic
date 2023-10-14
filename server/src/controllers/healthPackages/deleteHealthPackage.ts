import mongoose from "mongoose";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { Request,Response } from "express";
const  HealthPackageAttributes = ['name','amountToPay','discounts','packageDurationInYears']


export const deleteHealthPackage = async (req:Request,res:Response)=>{
    try{
        const deleteResponse = await HealthPackage.deleteOne({_id:req.params.id})

        if(deleteResponse.deletedCount==0){
            res.send('This package does not exist')
        }else{
            res.send('Package Deleted Succesfully')
        }
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            return res.send("Health Package Not found")

        return res.send(err)
    }
   
}