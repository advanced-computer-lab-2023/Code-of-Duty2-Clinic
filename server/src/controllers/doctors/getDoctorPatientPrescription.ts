import { Request, Response } from 'express';
import Prescription from '../../models/prescriptions/Prescription';


export const getDoctorPatientPrescription = async (doctorId: string, patientId: string) => {
    try {
        // Find prescriptions by patient ID
        const prescriptions = await Prescription.find({ patientId: patientId, doctorId: doctorId }).populate({
            path: 'medicines.medicineId',
            model: 'Medicine',
         });

        return prescriptions;
    } catch (error) {
        throw error;
    }
};
