import mongoose from "mongoose";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
const  HEALTH_PACKAGE_ATTRIBUTES = ['name','amountToPay','discounts','packageDurationInYears']
const  DISCOUNT_ATTRIBUTES = ['gainedDoctorSessionDiscount','gainedPharamcyMedicinesDiscount','gainedFamilyMembersDiscount']


//helps checking for attributes existance 
function checkIfIncludes(superSet:string[] , subSet:string[]):boolean{
    return  superSet.every((attribute)=> subSet.includes(attribute))        
}


export const updateHealthPackage = async (req:Request,res:Response)=>{

    //Get attributes for validation
    const requestAttributes = Object.keys(req.body)
    const requestDiscountAttributes :string[]= req.body.discounts?Object.keys(req.body.discounts):[]

    //Check if valid
    let validAttributes = checkIfIncludes(requestAttributes,HEALTH_PACKAGE_ATTRIBUTES) && checkIfIncludes(requestDiscountAttributes,DISCOUNT_ATTRIBUTES)
    validAttributes= validAttributes && requestAttributes.length <= HEALTH_PACKAGE_ATTRIBUTES.length && requestDiscountAttributes.length <= DISCOUNT_ATTRIBUTES.length 

    if(!validAttributes )   
        res.sendStatus(StatusCodes.BAD_REQUEST)
    
    try {
        const _id = req.params.id;

        await HealthPackage.updateOne({_id},{$set:req.body},{runValidators: true})

        res.status(StatusCodes.OK).send("Updated Successfuly")
    
    } catch(err:any){

        if(err instanceof mongoose.Error.CastError)
            return res.send("Health Package not found")

        return res.status(StatusCodes.BAD_REQUEST).send(err.message)
    }
}