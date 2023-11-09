import { Request, Response } from 'express';
import PatientModel from '../../models/patients/Patient';

export const viewHealthCarePackageStatus = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;

    // Find the patient by ID
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Access the subscribed package details for the patient
    const subscribedPackage = patient.subscribedPackage;

    if (!subscribedPackage) {
      return res.status(404).json({ message: 'Patient has no subscribed package' });
    }

    const subscriptionStatus = {
      status: subscribedPackage.status, 
      renewalDate: subscribedPackage.startDate, 
      endDate: subscribedPackage.endDate, 
    };

    res.status(200).json(subscriptionStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};