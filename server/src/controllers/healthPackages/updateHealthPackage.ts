import mongoose from "mongoose";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
const  HealthPackageAttributes = ['name','amountToPay','discounts','packageDurationInYears']
const  discountAttributes = ['gainedDoctorSessionDiscount','gainedPharamcyMedicinesDiscount','gainedFamilyMembersDiscount']


function checkIfIncludes(superSet: string[], subSet: string[]): boolean {
    return superSet.every((attribute)=> subSet.includes(attribute));        
}

export const updateHealthPackage = async (req:Request,res:Response) => {
    
    const requestAttributes = Object.keys(req.body);
    const requestDiscountAttributes: string[] = req.body.discounts?Object.keys(req.body.discounts): []

    let validAttributes = checkIfIncludes(requestAttributes,HealthPackageAttributes);
    validAttributes= validAttributes && checkIfIncludes(requestDiscountAttributes,discountAttributes) && requestAttributes.length <= 4 && requestDiscountAttributes.length <= 3

    if(validAttributes) {
        try {
            const prevPackage:any = await HealthPackage.findById(req.params.id);
           
            if(!prevPackage){
                return res.status(StatusCodes.OK).send("Health Package not found")
            
            }
            const prevDiscount  = prevPackage.discounts

            requestAttributes.forEach((attribute) =>{
                if(attribute !='discounts')
                prevPackage[attribute] = req.body[attribute]
            })
            
            requestDiscountAttributes.forEach(attribute =>  prevDiscount[attribute]= req.body.discounts[attribute])
            prevPackage.discounts = prevDiscount
           
            await prevPackage.save(); 
            
            return res.json(prevPackage)

        }catch(err){
            if(err instanceof mongoose.Error.CastError)
                return res.send("Health Package not found")
            return res.status(StatusCodes.BAD_REQUEST).send(err)
        }
        
    }
        
    else{
        res.sendStatus(StatusCodes.BAD_REQUEST)
    }
    
}