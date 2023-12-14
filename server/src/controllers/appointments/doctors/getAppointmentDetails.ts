import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findAppointmentDetailsForDoctor } from "../../../services/appointments/doctors";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";

export const getAppointmentDetails = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const doctorId = req.user?.id;
  const { appointmentId } = req.params;
  if (!doctorId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "doctorId is required" });
  if (!appointmentId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "appointmentId is required" });

  try {
    const appointmentDetails: any = await findAppointmentDetailsForDoctor(
      doctorId,
      appointmentId
    );
    res.status(StatusCodes.OK).json(appointmentDetails);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};
