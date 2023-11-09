import { Request, Response } from 'express';
import PatientModel from '../../models/patients/Patient';

export const viewSubscribedPackage = async (req: Request, res: Response) => {
  try {
    const { patientId, dependentNid } = req.params;

    // Find the patient by ID
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Verify that the patient has the specified dependent family member
    const dependent = patient.dependentFamilyMembers?.find((dependentFamilyMembers) => dependentFamilyMembers.nationalId === dependentNid);

    if (!dependent) {
      return res.status(404).json({ message: 'Dependent family member not found' });
    }

    // Access the subscribed package details for the dependent
    const subscribedPackage = dependent.subscribedPackage;

    if (!subscribedPackage) {
      return res.status(404).json({ message: 'Dependent family member has no subscribed package' });
    }

    res.status(200).json(subscribedPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
