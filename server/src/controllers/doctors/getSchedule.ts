import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import Doctor from "../../models/doctors/Doctor";

export const getDoctorSchedule = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const doctorId = req.body.doctorId || req.user?.id!;

    const doctor = await Doctor.findById(doctorId).select("+workingSchedule");

    if (!doctor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Doctor not found" });
    }

    const workingSchedule = doctor.workingSchedule;

    return res.status(StatusCodes.OK).json(workingSchedule);
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      message: "An error occurred while fetching working schedule",
    });
  }
};
