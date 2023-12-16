import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';

const moment = require('moment');

export const getPatientInfo = async (req: Request, res: Response) => {
    const patientId = req.params.patientId;

    try {
        const patient = await Patient.findById(patientId);
        const dateOfBirth = moment(patient?.dateOfBirth).format('DD/MM/YYYY');

        const patientInfo = {
            name: patient?.name,
            dateOfBirth: dateOfBirth,
            email: patient?.email,
            gender: patient?.gender,
            mobileNumber: patient?.mobileNumber,
        }

        if (!patient) {
            return res.status(StatusCodes.NOT_FOUND).send('Patient not found');
        }

        res.status(StatusCodes.OK).send(patientInfo);
       
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error getting patient by ID' });
    }
}

export const getPatientInfoDashController = async (req: AuthorizedRequest, res: Response) => {
    const patientId = req.user?.id!;
    try {
        const patient = await Patient.findById(patientId);
        const dateOfBirth = moment(patient?.dateOfBirth).format('DD/MM/YYYY');

        const patientInfo = {
            name: patient?.name,
            dateOfBirth: dateOfBirth,
            email: patient?.email,
            gender: patient?.gender,
            mobileNumber: patient?.mobileNumber,
        }

        if (!patient) {
            return res.status(StatusCodes.NOT_FOUND).send('Patient not found');
        }

        res.status(StatusCodes.OK).send(patientInfo);
       
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error getting patient by ID' });
    }
}
