import { Response } from "express";
import { findAllHealthPackages } from "../../services/health-packages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";

export const getAllAvailableHealthPackages = async (
  _req: AuthorizedRequest,
  res: Response
) => {
  try {
    const healthPackages = await findAllHealthPackages();
    res.status(StatusCodes.OK).json(healthPackages);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};
