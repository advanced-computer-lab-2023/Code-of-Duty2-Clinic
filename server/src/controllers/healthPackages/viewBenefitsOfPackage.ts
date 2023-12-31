import { Request, Response } from "express";
import Patient from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { viewSubscribedHealthPackageBenefitsService } from "../../services/patients";

export const viewSubscribedHealthPackageBenefits = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  try {
    const subscribedHealthPackage =
      await viewSubscribedHealthPackageBenefitsService(patientId);
    return res.status(200).json({ subscribedHealthPackage });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};