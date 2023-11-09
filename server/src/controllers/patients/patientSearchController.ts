import express, { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import { StatusCodes } from 'http-status-codes';

const searchPatientByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        console.log(name);

        const patientData = await Patient.findOne({ name: { $regex: new RegExp(name as string, 'i') } });

        if (!patientData) {
            return res.status(StatusCodes.NOT_FOUND).send('Patient not found');
        }

        res.status(StatusCodes.OK).send(patientData);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};

const searchPatientByMobileNumber = async (req: Request, res: Response) => {
    try {
        const { mobile } = req.params;
        const patientData = await Patient.findOne({ mobileNumber: mobile });

        if (!patientData) {
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
        const { email } = req.params;
        const patientData = await Patient.findOne({ email: { $regex: new RegExp(email as string, 'i') } });

        if (!patientData) {
            return res.status(StatusCodes.NOT_FOUND).send();
        }

        res.status(StatusCodes.OK).send(patientData);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};

export { searchPatientByName, searchPatientByMobileNumber, searchPatientByEmail };
