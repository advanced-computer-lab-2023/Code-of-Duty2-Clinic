import { Request, Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';
import Patient from '../../models/patients/Patient';
import Doctor from '../../models/doctors/Doctor';
import Medicine from '../../models/medicines/Medicine';
import { ObjectId } from 'mongoose';
import checkUpdateParams from '../../utils/attributeExistanceChecker'

export const getPatientPrescriptions= async (req:Request, res:Response)=>{
    try{
        const allowedUpdateParams =['updatedAt','doctorName','date','status']
        //join patient
        const patientId = req.params.patientId;
        const patient = await Patient.findById(patientId);
        if(!patient) {
            return res.status(400).json({error:'No such patient'});
        }
    
        const patientName = patient?.name;
    
    
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
        
        //find prescriptions
        let prescriptions = await Prescription.find({patientId:patientId,...updateParams});

        //return if empty
        if(!prescriptions || prescriptions.length === 0) {
            return res.status(200).json([]);
        }
    
         //Join doctor and medicines
        const prescriptionsWithNames: any[]= [];
        const prescriptionsRes = [];
       
        for (let prescription of prescriptions) {
            const doctor = await Doctor.findById(prescription.doctorId);
            if(!doctor){
               return res.status(200).json([]);
            }
            const name= req.query?.doctorName as string
            //check doctor name
            if(req.query?.doctorName&&req.query.doctorName&&(!doctor.name.toLowerCase().includes(name.toLowerCase())))continue;
            
           
            const doctorName = doctor.name; 

            //Join medicines
            const medicines:{name?:string,price?:number,_id?:ObjectId,dosage?:string}[] =[]
            for(let medicine of prescription.medicines){
                let fetchedMedicine  = await Medicine.findById(medicine.medicineId).select({ name: 1, price: 1,_id:1})

                const responseMedicine:{name?:string,price?:number,_id:ObjectId,dosage?:string}={
                    _id:fetchedMedicine?._id,
                    name:fetchedMedicine?.name,
                    dosage:medicine.dosage,
                    price:fetchedMedicine?.price
                }
               
                if(fetchedMedicine)
                    medicines.push(responseMedicine)
            }
            //Generate prescription    
            const prescriptionWithName = {
                ...prescription.toJSON(),
                ...{doctorName: doctorName, patientName: patientName},
                medicines
            }

            prescriptionsWithNames.push(prescriptionWithName);
        }
    
        return res.status(200).json(prescriptionsWithNames);
    
    }catch(err){
        res.status(400).send(err)
    }

}




