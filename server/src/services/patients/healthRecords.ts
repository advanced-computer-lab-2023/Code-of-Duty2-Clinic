import mongoose, { Mongoose } from "mongoose"
import Patient from "../../models/patients/Patient"

export const getHealthRecords =async (id:string)=>{
    try{
        return (await Patient.findById(id).select({_id:0,healthRecords:1}))?.healthRecords
    }catch(err){

        if(err instanceof mongoose.Error.CastError)
            return 'Patient Not Found'
        else
            return err
    }
    
}

export const addHealthRecord = async (id:string , healthRecord :{name:string,url:string})=>{
    try{
        return await Patient.updateOne({_id:id},{$push:{healthRecords:healthRecord}},{runValidtors:true})
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
        return 'Patient Not Found'
    else
        return err
    }
}

export const deleteHealthRecord = async (id:string , healthRecordLink:string)=>{
    try{
        return await Patient.updateOne({_id:id},{$pull:{healthRecords:{url: healthRecordLink}}})
    }catch(err){
        if(err instanceof mongoose.Error.CastError)
        return 'Patient Not Found'
    else
        return err
    }
}