import { Request, Response } from 'express';
import PatientModel from '../../models/patients/Patient';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { cancelSubscribedForDependentService } from '../../services/patients';

// Controller function to set the subscribed package for a dependent family member
export async function cancelSubscribedForDependent(req: AuthorizedRequest, res: Response) {
  
    const patientId = req.user?.id!;
    const {  dependentNid} = req.body;
    
    try {
    await cancelSubscribedForDependentService(patientId,dependentNid);
    res.status(200).json({ message: 'Subscribed package Cancelled for dependent family member' });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}