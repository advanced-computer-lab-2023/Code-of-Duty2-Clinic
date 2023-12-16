import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { findDoctorById } from "../../../services/doctors";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { getDoctorAppointments } from "../../../services/appointments/doctors";

export const getAppointmentsWithAllPatients = async (req: AuthorizedRequest, res: Response) => {
  const doctorId = req.user?.id;
  if (!doctorId)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "doctorId is required" });

  const allowedQueryParameters = ["status", "appointmentTime", "isTimeSet", "targetName"];

  if (
    Object.keys(req.query).length > allowedQueryParameters.length ||
    Object.keys(req.query).some((key) => !allowedQueryParameters.includes(key))
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("only patient name, appointment status or time slot must be provided");
  }

  if (
    (req.query.appointmentTime && !req.query.isTimeSet) ||
    (req.query.isTimeSet && !req.query.appointmentTime)
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("isTimeSet and appointmentTime must be provided together");
  }

  try {
    const doctor = await findDoctorById(doctorId);
    if (!doctor)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: entityIdDoesNotExistError("Doctor", doctorId) });

    const appointments = await getDoctorAppointments(doctorId, req.query);

    res.status(StatusCodes.OK).json(appointments);
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
