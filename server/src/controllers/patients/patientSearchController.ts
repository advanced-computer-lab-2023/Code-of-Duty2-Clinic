import express, { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import { StatusCodes } from 'http-status-codes';


const searchPatient = async (req: Request, res: Response) => {
    const { name, mobile, email } = req.query;

    if (name) {
        const patientData = await Patient.findOne({ name: { $regex: new RegExp(name as string, 'i') } });
        return res.status(StatusCodes.OK).send(patientData);
    } 
    
    if (mobile && !email) {
        const patientData = await Patient.findOne({ mobileNumber: mobile });
        return patientData ? res.status(StatusCodes.OK).send(patientData) : res.status(StatusCodes.NOT_FOUND).send('Patient not found');
    } else if (email && !mobile) {
        const patientData = await Patient.findOne({ email: { $regex: new RegExp(email as string, 'i') } });
        return patientData ? res.status(StatusCodes.OK).send(patientData) : res.status(StatusCodes.NOT_FOUND).send('Patient not found');
    } else if (mobile && email) {
        const patientData = await Patient.findOne({
            $and: [
              { mobileNumber: mobile },
              { email: { $regex: new RegExp(email as string, 'i') } }
            ]
          });
       
          return patientData ? res.status(StatusCodes.OK).send(patientData) : res.status(StatusCodes.NOT_FOUND).send('Patient not found');
    }

    res.status(StatusCodes.BAD_REQUEST).send('Invalid query parameters');

}


export {searchPatient};
