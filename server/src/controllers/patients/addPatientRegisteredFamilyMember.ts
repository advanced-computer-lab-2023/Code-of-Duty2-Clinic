import { Response } from 'express';
import Patient from '../../models/patients/Patient';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { StatusCodes } from 'http-status-codes';
import { IRegisteredFamilyMember } from '../../models/patients/interfaces/IRegisteredFamilyMember';
import axios from 'axios';


export const addPatientRegisteredFamilyMember = async (req: AuthorizedRequest, res: Response) => {

    const patientId = req.user?.id;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const relation = req.body.relation;

  try {
    // Find the requesting patient
    const requestingPatient = await Patient.findById(patientId).select('+registeredFamilyMembers');

    let query: any = {};

    if (email) {
      query.email = email;
    }
    if (mobile) {
      query.mobileNumber = mobile;
    }

  const familyMember = await Patient.findOne(query);

    if (!familyMember) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'No patient with the entered details was found' });
      }

    const registeredFamilyMember: IRegisteredFamilyMember = {
        id: familyMember!.id,
        relation: relation as 'wife' | 'husband' | 'children',
    };

    // Initialize registeredFamilyMembers to an empty array if it is undefined
if (!requestingPatient!.registeredFamilyMembers) {
  requestingPatient!.registeredFamilyMembers = [];
}

// Check if the family member already exists in the registeredFamilyMembers array
if (requestingPatient!.registeredFamilyMembers.some(member => member.id.toString() === familyMember!.id.toString())) {
  return res.status(StatusCodes.BAD_REQUEST).json({ message: `${familyMember.name} is already registered as a family member` });
}

// Add the family member to the requesting patient's registered family members
requestingPatient!.registeredFamilyMembers.push(registeredFamilyMember);
await requestingPatient!.save();
res.status(StatusCodes.OK).json({ message: `${familyMember.name} has been added as a registered family member` });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};
