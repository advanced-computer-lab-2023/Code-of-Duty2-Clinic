import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import {
  getDependentPatientHealthRecords,
  getHealthRecords
} from "../../services/patients/healthRecords";
import { Response } from "express";

export const getPatientHealthRecordsByDoctor = async (req: AuthorizedRequest, res: Response) => {
  if (!req.user?.id) return res.status(StatusCodes.BAD_REQUEST).send("User Id null ");
  try {
    const { patientId } = req.params;
    const { supervisingPatientId } = req.query;
    if (supervisingPatientId) {
      return res
        .status(StatusCodes.OK)
        .json(await getDependentPatientHealthRecords(patientId, supervisingPatientId as string));
    } else {
      return res.status(StatusCodes.OK).json(await getHealthRecords(patientId));
    }
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
