import { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import PatientModel from '../../models/patients/Patient';
import { IRegisteredFamilyMember } from '../../models/patients/IRegisteredFamilyMember';
import { IPatient } from '../../models/patients/IPatient';
import { isPromise } from 'util/types';
import Patient from '../../models/patients/Patient';

export const getPatientRegisteredFamilyMembers = async (req: Request, res: Response) => {
  const id = req.params.patientId;
  try {
    const patient = await PatientModel.findById(id);
    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Patient not found' });
    }

    const registeredFamilyMembers: IRegisteredFamilyMember[] = patient.registeredFamilyMembers || [];
    const members = [];

    console.log(registeredFamilyMembers);

    for (const familyMember of registeredFamilyMembers) {
      const memberId = familyMember.id;
      const registeredFamilyMember: IPatient | null = await PatientModel.findById(memberId);
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
