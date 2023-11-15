import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { scheduleAFollowUpAppointment } from "../../../services/appointments/doctors";

export const scheduleFollowUpAppointmentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { startTime, endTime } = req.body;
    if (!startTime)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Start time is required" });
    if (!endTime)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "End time is required" });

    const doctorId = req.user?.id!;

    const { patientId } = req.params;
    if (!patientId)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Patient id is required" });

    await scheduleAFollowUpAppointment(doctorId, patientId, startTime, endTime);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Follow-up appointment scheduled successfully!" });
  } catch (error: any) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};
