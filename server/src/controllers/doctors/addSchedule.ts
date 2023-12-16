import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { addWorkingSchedule } from "../../services/doctors";
import Doctor from "../../models/doctors/Doctor";

export const addDoctorSchedule = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { daysOff, workingHours } = req.body;
    const doctorId = req.user?.id!;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Doctor not found" });
    }

    await addWorkingSchedule(doctorId, { daysOff, workingHours });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Schedule is added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "An error occurred while adding time slots" });
  }
};
