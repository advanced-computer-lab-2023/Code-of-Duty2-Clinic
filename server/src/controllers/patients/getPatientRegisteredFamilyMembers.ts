import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import PatientModel from "../../models/patients/Patient";
import { IRegisteredFamilyMember } from "../../models/patients/interfaces/IRegisteredFamilyMember";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { findPatientById } from "../../services/patients";

export const getPatientRegisteredFamilyMembers = async (req: AuthorizedRequest, res: Response) => {
  const patientId = req.user?.id!;
  try {
    const patient = await findPatientById(patientId, "registeredFamilyMembers");
    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Patient not found" });
    }

    const registeredFamilyMembers: IRegisteredFamilyMember[] =
      patient.registeredFamilyMembers || [];
    const members = [];

    for (const familyMember of registeredFamilyMembers) {
      const memberId = familyMember.id;
      const registeredFamilyMember = await PatientModel.findById(memberId);
      if (registeredFamilyMember) {
        members.push({
          name: registeredFamilyMember.name,
          relation: familyMember.relation,
          id: registeredFamilyMember._id
        });
      }
    }

    return res.status(StatusCodes.OK).json(members);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};
