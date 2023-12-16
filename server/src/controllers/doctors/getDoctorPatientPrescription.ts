import { Request, Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';
import Patient from '../../models/patients/Patient';
import { IPatient } from '../../models/patients/interfaces/IPatient';
import IPrescription from '../../models/prescriptions/interfaces/IPrescription';
import { getPatientById } from '../patients/getPatientById';
import { getPatientPrescriptions } from '../prescriptions/getPatientPrescriptions';
import { getDoctorPatients } from '../../services/doctors';
import axios from 'axios';
import { config } from 'dotenv';
import { StatusCodes } from 'http-status-codes';

export const getDoctorPatientPrescription = () => async (req: Request, res: Response) => {
    try {
        const patients = req.params.patients;
        const prescriptions: IPrescription[] = [];
        
        for (const patient of patients) {
            const patientPrescriptions = await axios.get(`${config.serverUri}/prescriptions/${patient.id}`);
            prescriptions.push(...patientPrescriptions);
        }
        
        return prescriptions;
    } catch (error) {
        throw error;
    }
};
