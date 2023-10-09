import mongoose, { CastError, Error} from "mongoose";
import HealthPackage, { IHealthPackageModel } from "../models/health_packages/HealthPackage";
import { Request,Response } from "express";
import { ErrorCallback } from "typescript";
import { IHealthPackage } from "models/health_packages/IHealthPackage";

const  HealthPackageAttributes = ['name','amountToPay','discount','packageDurationInYears']
const  discountAttributes = ['gainedDoctorSessionDiscount','gainedPharamcyMedicinesDiscount','gainedFamilyMembersDiscount']


//helps checking for attributes existance 
function checkIfIncludes(superSet:string[] , subSet:string[]):boolean{
    return  superSet.every((attribute)=> subSet.includes(attribute))        
}

//Get Health Package by ID
export const getHealthPackage = async (req:Request,res:Response)=>{
    try{
        const healthPackage = await HealthPackage.findById(req.params.id)
        res.json(healthPackage)
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
            res.send("Health Package Not found")
        return res.send(err)
    }
}

//Get ALL Health Packages 
export const getHealthPackages = async (req:Request,res:Response)=>{

    try{
        res.json(await HealthPackage.find())
    }catch(err){
        res.send(err)
    }
   

}

//Create Health Package 
export const addHealthPackage = async (req:Request,res:Response)=>{

    //Validate attributes existance

    const requestAttributes = Object.keys(req.body)
    const requestDiscountAttributes :string[]= req.body.discount?Object.keys(req.body.discount):[]

    let allAttributesExist = checkIfIncludes(HealthPackageAttributes,requestAttributes)
     allAttributesExist =  allAttributesExist && checkIfIncludes(discountAttributes,requestDiscountAttributes)

    //Prevent additional attributes
    if(allAttributesExist && requestAttributes.length === 4 && requestDiscountAttributes.length === 3){
            //Add package
            try{
                const healthPackage = await HealthPackage.create(req.body)
                res.sendStatus(200)
            }catch(err){
                res.send(err)
            }
           
    }
    else{
             res.sendStatus(400)
    }

}


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


export const updateHealthPackage = async (req:Request,res:Response)=>{
    
    const requestAttributes = Object.keys(req.body)
    const requestDiscountAttributes :string[]= req.body.discount?Object.keys(req.body.discount):[]

    let validAttributes = checkIfIncludes(requestAttributes,HealthPackageAttributes)
    validAttributes= validAttributes && checkIfIncludes(requestDiscountAttributes,discountAttributes) &&  requestAttributes.length <= 4 && requestDiscountAttributes.length <= 3

    //Prevent attributes not exceeding HealthPAckage attributes
    if(validAttributes ){
        try{

            const prevPackage:any= await HealthPackage.findById(req.params.id)

            //if the id is not found 
            if(!prevPackage){
                return res.status(404).send("Health Package not found")
            
            }
           
            const prevDiscount  = prevPackage.discount

            //update health Package attributes except discount 
            requestAttributes.forEach((attribute) =>{
                if(attribute !='discount')
                prevPackage[attribute] = req.body[attribute]
            })
            
            //Update discount attributes
            requestDiscountAttributes.forEach(attribute =>  prevDiscount[attribute]= req.body.discount[attribute])
            prevPackage.discount = prevDiscount
           
            //save document
            await prevPackage.save(); 
            return res.json(prevPackage)

        }catch(err){
            if(err instanceof mongoose.Error.CastError)
                return res.send("Health Package not found")
            return res.send(err)
        }
        
    }
        
    else{
        res.sendStatus(400)
    }
    
}