import mongoose from "mongoose";
import { Response } from "express";
import {
  findHealthPackageById,
  findHealthPackageDetailsAfterDiscount,
} from "../../services/health-packages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";

export const getHealthPackage = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const patientId = req.user?.id!;
    const { packageId } = req.params;
    const healthPackage = await findHealthPackageDetailsAfterDiscount(
      patientId,
      packageId
    );
    res.status(StatusCodes.OK).json(healthPackage);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError)
      res.send("Health Package Not found");
    return res.send(err);
  }
};
