import { Request, Response } from 'express';
import PatientModel, { IPatientModel } from '../../models/patients/Patient';
import PrescriptionModel, { IPrescriptionModel } from '../../models/prescriptions/Prescription';

export default async function viewPatientHealthRecords(req: Request, res: Response) {
  try {
    const patientId = req.params.patientId; // Extract patientId from request parameters

    // Find the patient by ID
    const patient: IPatientModel | null = await PatientModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Find prescriptions associated with this patient
    const prescriptions: IPrescriptionModel[] = await PrescriptionModel.find({
      patientId: patient._id,
    });

    // You can extract and return specific health records or patient information here
    return res.status(200).json({
      patientInfo: patient,
      prescriptions: prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

