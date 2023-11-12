import { Request, Response } from "express";
import PatientModel from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { setSubscribedPackageForDependentService } from "../../services/patients";

// Controller function to set the subscribed package for a dependent family member
export async function setSubscribedPackageForDependent(
  req: AuthorizedRequest,
  res: Response
) {
  const { dependentNid, packageId, startDate, endDate } = req.body;
  const patientId = req.user?.id!;

  try {
    await setSubscribedPackageForDependentService(
      patientId,
      dependentNid,
      packageId,
      startDate,
      endDate
    );
    res
      .status(200)
      .json({ message: "Subscribed package set for dependent family member" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
