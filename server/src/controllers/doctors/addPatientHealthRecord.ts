import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import allAttributesExist from "../../utils/attributeExistenceChecker";
import { Response } from "express";
import { addDependentHealthRecord, addHealthRecord } from "../../services/patients/healthRecords";

export const doctorAddPatientHealthRecord = async (req: AuthorizedRequest, res: Response) => {
  if (!req.user?.id) return res.status(StatusCodes.BAD_REQUEST).send("User id is null");

  const healthRecordAttributes = ["url", "fileType", "recordType", "createdAt"];
  if (!req.params.patientId || !allAttributesExist(healthRecordAttributes, Object.keys(req.body))) {
    return res.status(StatusCodes.BAD_REQUEST).send("Attributes missing");
  }

  const { patientId } = req.params;
  const { supervisingPatientId } = req.query;

  try {
    if (supervisingPatientId) {
      res
        .status(StatusCodes.OK)
        .json(await addDependentHealthRecord(patientId, supervisingPatientId as string, req.body));
    } else {
      res.status(StatusCodes.OK).json(await addHealthRecord(patientId, req.body));
    }
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
