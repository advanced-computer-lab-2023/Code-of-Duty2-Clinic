import { Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { StatusCodes } from 'http-status-codes';
import Doctor from '../../models/doctors/Doctor';
import Medicine from '../../models/medicines/Medicine';

export const getAllPrescriptions = async (req: AuthorizedRequest, res: Response) => {
    const patientId = req.user?.id;
    try {
        const prescriptions = await Prescription 
            .find({ patientId: patientId })
            .populate({
                path: 'doctorId',
                select: 'name -_id', // replace 'name' with the actual field name for the doctor's name
                model: Doctor
            })
            .populate({
                path: 'medicines.medicineId',
                model: Medicine
            });

        if (!prescriptions) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No prescriptions found' });
        }

        res.json(prescriptions);
    } catch(err) {
        const error = err as Error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
}