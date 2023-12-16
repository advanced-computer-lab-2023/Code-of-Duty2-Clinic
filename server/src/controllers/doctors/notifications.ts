import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { getAllNotificationsForDoctor } from "../../services/notifications/doctors";
import { StatusCodes } from "http-status-codes";

export const getAllNotificationsForDoctorHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const doctorId = req.user!.id;
  try {
    const notifications = await getAllNotificationsForDoctor(doctorId);
    res.status(StatusCodes.OK).json(notifications);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
