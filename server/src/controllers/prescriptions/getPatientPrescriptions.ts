import Medicine from '../../models/medicines/Medicine';
import { Request, Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';
import checkUpdateParams from '../../utils/attributeExistanceChecker'
export const getPatientPrescriptions= async (req:Request, res:Response)=>{
    try{
        const allowedUpdateParams =['updatedAt','doctorName','date','status']
        const patientId= req.params.patientId

        //check params
        let updateParams:any= {...req.query}
        if(!checkUpdateParams(Object.keys(updateParams),allowedUpdateParams)) return res.status(400).json({error:"Invalid Params"})
        delete updateParams['doctorName']
    
        //Date search range 
        if(req.query.updatedAt){
            const startDate = new Date(updateParams.updatedAt);
            const endDate = new Date(updateParams.updatedAt);
            endDate.setDate(endDate.getDate() + 1); // add one day to get the end of the day
            updateParams.updatedAt = { $gte: startDate, $lt: endDate} 
        }
        
        //filter prescriptions
        let prescriptions = await (Prescription.find({patientId:patientId,...updateParams})
            .populate({
                path: 'doctorId',
                match:{name: new RegExp(req.query.doctorName as string, 'i') },
                select: 'name -_id'
            }).populate({ 
                path: 'medicines.medicineId', 
                model: Medicine,
                select:'name price'
            })
            .exec())

        var result:any = [];
        prescriptions.forEach(doc => {if(doc.doctorId!==null)result.push(doc)})


        res.json(result); 
           
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }

}