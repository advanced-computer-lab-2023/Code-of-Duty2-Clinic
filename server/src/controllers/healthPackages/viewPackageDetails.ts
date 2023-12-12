import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { viewHealthCarePackageStatusService } from "../../services/patients";
import { StatusCodes } from "http-status-codes";

export const viewHealthCarePackageStatus = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const patientId = req.user?.id!;

    const subscriptionStatus = await viewHealthCarePackageStatusService(
      patientId
    );

    res.status(StatusCodes.OK).json(subscriptionStatus);
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
