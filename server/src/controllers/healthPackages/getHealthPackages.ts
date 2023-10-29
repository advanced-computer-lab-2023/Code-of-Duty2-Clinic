import mongoose from "mongoose";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { Request,Response } from "express";
const  HealthPackageAttributes = ['name','amountToPay','discounts','packageDurationInYears']
const  discountAttributes = ['gainedDoctorSessionDiscount','gainedPharamcyMedicinesDiscount','gainedFamilyMembersDiscount']


//helps checking for attributes existance 
function checkIfIncludes(superSet:string[] , subSet:string[]):boolean{
    return  superSet.every((attribute)=> subSet.includes(attribute))        
}

//Get ALL Health Packages 
export const getHealthPackages = async (req:Request,res:Response)=>{

    try{
        res.json(await HealthPackage.find({},{name:1,amountToPay:1,discounts:1, packageDurationInYears:1}))
    }catch(err){
        res.send(err)
    }
   

}