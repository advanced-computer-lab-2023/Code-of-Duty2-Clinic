import { Request, Response } from "express";
import PatientModel from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { viewHealthCarePackageStatusForDependentService } from "../../services/patients";

export async function viewSubscribedPackageDetailsForDependent(
  req: AuthorizedRequest,
  res: Response
) {
  try {
    const { dependentNid } = req.body;
    const patientId = req.user?.id!;

    const subscriptionStatus =
      await viewHealthCarePackageStatusForDependentService(
        patientId,
        dependentNid
      );
    return res.status(200).json({ subscriptionStatus });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
