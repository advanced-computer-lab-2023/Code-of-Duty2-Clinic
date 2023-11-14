import { Request, Response } from "express";
import {
  findAllHealthPackages,
  findAllHealthPackagesAfterDiscount,
} from "../../services/health-packages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";

export const getHealthPackages = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const patientId = req.user?.id!;
    res
      .status(StatusCodes.OK)
      .json(await findAllHealthPackagesAfterDiscount(patientId));
  } catch (err) {
    res.send(err);
  }
};
