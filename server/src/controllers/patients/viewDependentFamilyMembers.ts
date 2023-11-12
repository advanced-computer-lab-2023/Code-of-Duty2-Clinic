import { Request, Response } from "express";
import Patient from "../../models/patients/Patient";
import { viewDependentFamilyMembersService } from "../../services/patients";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const getDependentFamilyMembers = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const patientId = req.user?.id;
    if (!patientId) {
      throw new Error("Patient id not found");
    }
    const dependentFamilyMembers = await viewDependentFamilyMembersService(
      patientId
    );
    res.status(200).json(dependentFamilyMembers);
  } catch (error: any) {
    console.error("Error fetching dependent family members:", error);
    res.status(500).json({ message: error.message });
  }
};
