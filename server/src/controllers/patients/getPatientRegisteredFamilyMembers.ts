import { Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import PatientModel from '../../models/patients/Patient';
import { IRegisteredFamilyMember } from '../../models/patients/interfaces/IRegisteredFamilyMember';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';

export const getPatientRegisteredFamilyMembers = async (req: AuthorizedRequest, res: Response) => {
  const patientId = req.user?.id;
  try {
    const patient = await PatientModel.findById(patientId).select('registeredFamilyMembers');
    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Patient not found' });
    }

    const registeredFamilyMembers: IRegisteredFamilyMember[] = patient.registeredFamilyMembers || [];
    const members = [];

    console.log(registeredFamilyMembers)
    for (const familyMember of registeredFamilyMembers) {
      const memberId = familyMember.id;
      const registeredFamilyMember = await PatientModel.findById(memberId);
      if (registeredFamilyMember) {
        console.log(registeredFamilyMember.name);
        members.push(
          {name: registeredFamilyMember.name,
          relation: familyMember.relation
        }
        );
      }
    }

    return res.status(StatusCodes.OK).json({ members });

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
  }
}
