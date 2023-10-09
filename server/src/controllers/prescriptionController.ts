import { Request,Response } from "express";
import Prescription from "../models/prescriptions/Prescription";
import allAttributesExist from '../utils/attributeExistanceChecker'


export const getPatientPrescriptions= async (req:Request, res:Response)=>{

    const prescriptionAttributes = ['date','status']
    const requestAttributes = Object.keys(req.body)
    
    //Check valid attributes
    let validAttributes = allAttributesExist(requestAttributes,prescriptionAttributes)
    validAttributes = validAttributes && requestAttributes.length<=2
    if(validAttributes){
        try{

            const searchFilters = req.body||{}

            searchFilters._id = req.params

            const prescriptions = await Prescription.find({patientId:req.params.patientId});
            res.send(prescriptions)

        }catch(err) {
            res.send(err)
        }
    }else{
        res.sendStatus(400)
    }

   
}

export const getAllPrescriptions = async (req:Request,res:Response)=>{

    try{
        res.json(await Prescription.find())
    }catch(err){
        res.send(err)
    }
   

}
