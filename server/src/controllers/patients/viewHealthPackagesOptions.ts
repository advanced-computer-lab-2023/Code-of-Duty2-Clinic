import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { findAllHealthPackagesAfterDiscount } from "../../services/health-packages";
import { StatusCodes } from "http-status-codes";

export const viewHealthPackagesOptions = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  try {
    const healthPackageOptions = await findAllHealthPackagesAfterDiscount(
      patientId
    );
    res.status(StatusCodes.OK).json(healthPackageOptions);
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
