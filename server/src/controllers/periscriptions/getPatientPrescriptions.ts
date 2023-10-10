import { Request, Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';
import Patient from '../../models/patients/Patient';
import Doctor from '../../models/doctors/Doctor';
import { StatusCodes } from 'http-status-codes';

export const getPatientPrescriptions= async (req:Request, res:Response)=>{
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if(!patient) {
        return res.status(400).json({error:'No such patient'});
    }

    const patientName = patient?.name;

    let prescriptions = await Prescription.find({patientId:patientId});
    if(!prescriptions || prescriptions.length === 0) {
        return res.status(400).json({error:'No prescriptions found for the given patient'});
    }


    const prescriptionsWithNames: any[]= [];
   for (let prescription of prescriptions) {

       const doctor = await Doctor.findById(prescription.doctorId);
       if(!doctor){
           return res.status(400).json({error:'No such doctor'});
       }
       const doctorName = doctor.name;
       const medicines = prescription.medicines
       
        const prescriptionWithName = {
            ...prescription.toJSON(),
            ...{doctorName: doctorName, patientName: patientName}
        }

        prescriptionsWithNames.push(prescriptionWithName);
    }

    return res.status(StatusCodes.OK).json({prescriptionsWithNames});

}




