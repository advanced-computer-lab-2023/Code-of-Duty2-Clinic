const express = require('express');
import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import { StatusCodes } from 'http-status-codes';

const searchPatientByName = async (req: Request, res: Response) => {
    try {
        const  { name }  = req.params;

        
        const patientData = await Patient.find({name :{ $regex: new RegExp(name as string, 'i') }});

        // console.log(patientData);

        if (!patientData) {
            // If no patient with the specified name is found, return a 404 response.
            return res.status(StatusCodes.NOT_FOUND).send('Patient not found');
        }

        res.status(StatusCodes.OK).send(patientData);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};

const searchPatientByPhoneNumber = async (req: Request, res: Response) => {
    try {
        const  { phoneNumber }  = req.params;

        
        const patientData = await Patient.find({phoneNumber :{ $regex: new RegExp(phoneNumber as string, 'i') }});

        // console.log(patientData);

        if (!patientData) {
            // If no patient with the specified phone number is found, return a 404 response.
            return res.status(StatusCodes.NOT_FOUND).send('Patient not found');
        }

        res.status(StatusCodes.OK).send(patientData);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};

const searchPatientByEmail = async (req: Request, res: Response) => {
    try {
        const  { email }  = req.params;

        
        const patientData = await Patient.find({email :{ $regex: new RegExp(email as string, 'i') }});

        // console.log(patientData);

        if (!patientData) {
            // If no patient with the specified email is found, return a 404 response.
            return res.status(StatusCodes.NOT_FOUND).send('Patient not found');
        }

        res.status(StatusCodes.OK).send(patientData);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};

export { searchPatientByName, searchPatientByPhoneNumber, searchPatientByEmail };
