import { Request, Response } from 'express';
import IPatient, { IClinicPatient } from '../models/ClinicPatient';
import PatientModel from '../models/ClinicPatient';

export const patientList = async (req: Request, res: Response) => {
    try {
        // const patients: IClinicPatient[] = await PatientModel.find();
        res.json([
           {
            name: "Mark Smith",
            relationship: "Father",
            phone: "555-555-5555",
            email: ""
              },
           {
            name: "Jane Smith",
            relationship: "Mother",
            phone: "555-555-5555",
            email: ""
              },
              {
            name: "John Smith",
            relationship: "Brother",
            phone: "555-555-5555",
            email: ""
              },
              {
            name: "Mary Smith",
            relationship: "Sister",
            phone: "555-555-5555",
            
           }
          ]);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

