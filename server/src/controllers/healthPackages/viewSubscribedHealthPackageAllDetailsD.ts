import { Request, Response } from "express";
import Patient from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { viewSubscribedHealthPackageAllDetailsServiceD } from "../../services/patients";

export const viewSubscribedHealthPackageAllDetailsD = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const patientNId = req.params.patientNId;
  try {
    const subscribedHealthPackage =
      await viewSubscribedHealthPackageAllDetailsServiceD(patientId,patientNId);
    return res.status(200).json(subscribedHealthPackage);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};