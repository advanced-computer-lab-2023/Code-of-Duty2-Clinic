import { Request, Response } from "express";
import PatientModel from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { viewSubscribedPackageForDependentService } from "../../services/patients";

export const viewSubscribedPackage = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { dependentNid } = req.body;
    const patientId = req.user?.id!;

    const subscribedPackage = await  viewSubscribedPackageForDependentService(
      patientId,
      dependentNid
    );
    res.status(200).json(subscribedPackage);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
