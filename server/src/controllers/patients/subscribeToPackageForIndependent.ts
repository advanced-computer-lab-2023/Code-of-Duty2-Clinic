import { Request, Response } from 'express';
import PatientModel from '../../models/patients/Patient';

// Controller function to set the subscribed package for a dependent family member
export async function setSubscribedPackageForDependent(req: Request, res: Response) {
  try {
    const { patientId, dependentNid, packageId, startDate, endDate} = req.body;

    // Find the patient by patientId
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    if (!patient.dependentFamilyMembers) {
        return res.status(404).json({ message: 'Dependent family members not found for the patient' });
    }
  
    // Find the dependent family member by dependentId
    const dependent = patient.dependentFamilyMembers.find((dependentFamilyMembers) => dependentFamilyMembers.nationalId === dependentNid);

    if (!dependent) {
      return res.status(404).json({ message: 'Dependent family member not found' });
    }
    // Set the subscribed package for the dependent family member
    dependent.subscribedPackage = {
      packageId,
      startDate,
      endDate,
      status:'subscribed',
    };

    // Save the changes
    await patient.save();

    res.status(200).json({ message: 'Subscribed package set for dependent family member' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
