const express = require('express');
import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';

const searchPatientByName = async (req: Request, res: Response) => {
    try {
        const  { name}  = req.params;

        
        const patientData = await Patient.find({name :{ $regex: new RegExp(name as string, 'i') }});

        // console.log(patientData);

        if (!patientData) {
            // If no patient with the specified name is found, return a 404 response.
            return res.status(404).send({ error: 'Patient not found' });
        }

        res.status(200).send(patientData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

export { searchPatientByName };
