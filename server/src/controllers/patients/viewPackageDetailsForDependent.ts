import { Request, Response } from 'express';
import PatientModel from '../../models/patients/Patient';

export async function viewSubscribedPackageForDependent(req: Request, res: Response) {
  try {
    const { patientId, dependentNid } = req.body;

    // Find the patient by patientId
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (!patient.dependentFamilyMembers) {
      return res.status(404).json({ message: 'Dependent family members not found for the patient' });
    }

    // Find the dependent family member by dependentNid
    const dependent = patient.dependentFamilyMembers.find((dependentFamilyMember) => dependentFamilyMember.nationalId === dependentNid);

    if (!dependent) {
      return res.status(404).json({ message: 'Dependent family member not found' });
    }

    // Check if the dependent has a subscribed package
    if (dependent.subscribedPackage) {
      const { status, startDate, endDate } = dependent.subscribedPackage;
      return res.status(200).json({ status, startDate, endDate });
    } else {
      return res.status(200).json({ message: 'No subscribed package for this dependent family member' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
