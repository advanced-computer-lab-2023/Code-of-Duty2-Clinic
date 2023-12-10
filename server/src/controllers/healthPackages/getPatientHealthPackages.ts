import { Response } from "express";
import { findAllHealthPackagesAfterDiscount } from "../../services/health-packages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";

export const getPatientHealthPackages = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const patientId = req.user?.id!;
    const healthPackages = await findAllHealthPackagesAfterDiscount(patientId);
    console.log("health packages: ", healthPackages);
    res.status(StatusCodes.OK).json(healthPackages);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};
