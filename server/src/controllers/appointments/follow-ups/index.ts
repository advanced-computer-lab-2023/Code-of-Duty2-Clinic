import { StatusCodes } from "http-status-codes";
import { getFollowUpRequestsForDoctor } from "../../../services/appointments/follow-ups";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { Response } from "express";

export const getAllFollowUpRequestsForDoctorHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const doctorId = req.user?.id;
  if (!doctorId) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing required fields" });
  }
  try {
    const followUpRequests = await getFollowUpRequestsForDoctor(doctorId!);
    res.status(StatusCodes.OK).json(followUpRequests);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
