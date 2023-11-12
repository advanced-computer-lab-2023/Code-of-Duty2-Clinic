import { Request, Response } from "express";
import PatientModel from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { viewHealthCarePackageStatusService } from "../../services/patients";

export const viewHealthCarePackageStatus = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const patientId = req.user?.id!;

    const subscriptionStatus = await viewHealthCarePackageStatusService(
      patientId
    );

    res.status(200).json(subscriptionStatus);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
