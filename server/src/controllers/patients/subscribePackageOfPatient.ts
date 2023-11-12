import { Request, Response } from "express";
import HealthPackageModel, {
  IHealthPackageModel,
} from "../../models/health_packages/HealthPackage";
import PatientModel, { IPatientModel } from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { subscribeToHealthPackageService } from "../../services/patients";

export const subscribeToHealthPackage = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { packageId } = req.body;
  const patientId = req.user?.id!;
  try {
    await subscribeToHealthPackageService(patientId, packageId);
    res.status(200).json({ message: "Subscription added successfully" });
  } catch (error: any) {
    console.error("Error subscribing to health package:", error);
    res.status(400).json({ message: error.message });
  }
};
