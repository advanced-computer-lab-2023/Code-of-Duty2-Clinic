import mongoose from "mongoose";
import HealthPackage from "../../models/health_packages/HealthPackage";
import { Request,Response } from "express";
const  HealthPackageAttributes = ['name','amountToPay','discounts','packageDurationInYears']
const  discountAttributes = ['gainedDoctorSessionDiscount','gainedPharamcyMedicinesDiscount','gainedFamilyMembersDiscount']
import checkIfIncludes from '../../utils/attributeExistanceChecker'


//helps checking for attributes existance 

//Get Health Package by ID


//Create Health Package 
export const addHealthPackage = async (req:Request,res:Response)=>{

    //Validate attributes existance

    const requestAttributes = Object.keys(req.body)
    const requestDiscountAttributes :string[]= req.body.discounts?Object.keys(req.body.discounts):[]

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


