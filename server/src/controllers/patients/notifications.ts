import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { getAllNotificationsForPatient } from "../../services/notifications/patients";
import { StatusCodes } from "http-status-codes";

export const getAllNotificationsForPatientHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user!.id;
  console.log("patientId", patientId);
  try {
    const notifications = await getAllNotificationsForPatient(patientId);
    res.status(StatusCodes.OK).json(notifications);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
