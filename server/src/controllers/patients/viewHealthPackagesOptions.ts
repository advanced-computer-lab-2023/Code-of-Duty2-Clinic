import { Request, Response } from "express";
import HealthPackageModel from "../../models/health_packages/HealthPackage";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { healthPackageOptionsService } from "../../services/patients";

export const viewHealthPackagesOptions = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const healthPackageOptions = await healthPackageOptionsService();
    res.status(200).json(healthPackageOptions);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
