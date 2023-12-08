import { Request, Response } from "express";
import Patient from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { viewSubscribedHealthPackageAllDetailsServiceR } from "../../services/patients";

export const viewSubscribedHealthPackageAllDetailsR = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.params.patientId;
  try {
    const subscribedHealthPackage =
      await viewSubscribedHealthPackageAllDetailsServiceR(patientId);
    return res.status(200).json({ subscribedHealthPackage });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};