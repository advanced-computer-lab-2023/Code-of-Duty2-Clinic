import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import {
  addHealthRecord,
  deleteHealthRecord,
  getHealthRecords,
} from "../../services/patients/healthRecords";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import allAttributesExist from "../../utils/attributeExistenceChecker";
import { STATUS_CODES } from "http";
export const getPatientHealthRecords = async (
  req: AuthorizedRequest,
  res: Response
) => {
  if (!req.user?.id)
    return res.status(StatusCodes.BAD_REQUEST).send("User Id null ");
  try {
    res.status(StatusCodes.OK).json(await getHealthRecords(req.user?.id));
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

export const addPatientHealthRecord = async (
  req: AuthorizedRequest,
  res: Response
) => {
  if (!req.user?.id)
    return res.status(StatusCodes.BAD_REQUEST).send("User Id null ");
  const healthRecordAttributes = ["url", "fileType", "recordType", "createdAt"];
  if (!allAttributesExist(healthRecordAttributes, Object.keys(req.body)))
    return res.status(StatusCodes.BAD_REQUEST).send("Attributes missing");
  try {
    res
      .status(StatusCodes.OK)
      .json(await addHealthRecord(req.user?.id, req.body));
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

export const deletePatientHealthRecord = async (
  req: AuthorizedRequest,
  res: Response
) => {
  if (!req.user?.id)
    return res.status(StatusCodes.BAD_REQUEST).send("User Id null ");
  if (!req.query.fileUrl)
    return res.status(StatusCodes.BAD_REQUEST).send("url Attribute missing");
  try {
    res
      .status(StatusCodes.OK)
      .json(
        await deleteHealthRecord(req.user?.id, req.query?.fileUrl as string)
      );
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
