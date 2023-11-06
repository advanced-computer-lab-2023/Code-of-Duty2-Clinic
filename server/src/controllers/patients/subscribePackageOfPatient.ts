import { Request, Response } from 'express';
import HealthPackageModel, { IHealthPackageModel } from '../../models/health_packages/HealthPackage';
import PatientModel, { IPatientModel } from '../../models/patients/Patient';


export const subscribeToHealthPackage = async (req: Request, res: Response) => {
  const { packageId, startDate, endDate } = req.body;
  const { patientId } = req.params;

  try {
    // Find the patient document
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Find the health package document
    const healthPackage = await HealthPackageModel.findById(packageId);
    if (!healthPackage) {
      return res.status(404).json({ message: 'Health package not found' });
    }

    patient.subscribedPackage = { packageId, startDate, endDate, status: 'subscribed' };
    await patient.save();

    res.status(200).json({ message: 'Subscription added successfully' });
  } catch (error) {
    console.error('Error subscribing to health package:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};