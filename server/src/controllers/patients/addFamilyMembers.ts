import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Patient from '../../models/patients/Patient';
import { entityIdDoesNotExistError } from '../../utils/ErrorMessages';


export const addFamilyMembers = async (req: Request, res: Response) => {
  const patientId = req.params.patientId;
  try {
    let patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json(entityIdDoesNotExistError('patient', patientId));
    }
    const dependentFamilyMembersNumber = patient.dependentFamilyMembers?.length || 0;

    if (!patient.dependentFamilyMembers) {
      patient.dependentFamilyMembers = [];
    }
    if(patient.dependentFamilyMembers.find((dependentFamilyMember) => dependentFamilyMember.nationalId === req.body.nationalId)){
      return res.status(StatusCodes.BAD_REQUEST).json({message: 'nationalId already exists'});
    }
    patient.dependentFamilyMembers?.push(req.body);
    patient = await patient.save();

    res.status(StatusCodes.CREATED).json(patient.dependentFamilyMembers?.[dependentFamilyMembersNumber]);

  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
