import mongoose from "mongoose";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { Request,Response } from "express";
const  HealthPackageAttributes = ['name','amountToPay','discounts','packageDurationInYears']
const  discountAttributes = ['gainedDoctorSessionDiscount','gainedPharamcyMedicinesDiscount','gainedFamilyMembersDiscount']


//helps checking for attributes existance 
function checkIfIncludes(superSet:string[] , subSet:string[]):boolean{
    return  superSet.every((attribute)=> subSet.includes(attribute))        
}



export const updateHealthPackage = async (req:Request,res:Response)=>{
    
    const requestAttributes = Object.keys(req.body)
    const requestDiscountAttributes :string[]= req.body.discounts?Object.keys(req.body.discounts):[]

    let validAttributes = checkIfIncludes(requestAttributes,HealthPackageAttributes)
    validAttributes= validAttributes && checkIfIncludes(requestDiscountAttributes,discountAttributes) &&  requestAttributes.length <= 4 && requestDiscountAttributes.length <= 3
    //Prevent attributes not exceeding HealthPAckage 
    if(validAttributes ){
        try{

            const prevPackage:any= await HealthPackage.findById(req.params.id)
           

            //if the id is not found 
            if(!prevPackage){
                return res.status(200).send("Health Package not found")
            
            }
           
            const prevDiscount  = prevPackage.discounts

            //update health Package attributes except discount 
            requestAttributes.forEach((attribute) =>{
                if(attribute !='discounts')
                prevPackage[attribute] = req.body[attribute]
            })
            
            //Update discount attributes
            requestDiscountAttributes.forEach(attribute =>  prevDiscount[attribute]= req.body.discounts[attribute])
            prevPackage.discounts = prevDiscount
           
            //save document
            await prevPackage.save(); 
            
            return res.json(prevPackage)

        }catch(err){
            if(err instanceof mongoose.Error.CastError)
                return res.send("Health Package not found")
            return res.status(400).send(err)
        }
        
    }
        
    else{
        res.sendStatus(400)
    }
    
}