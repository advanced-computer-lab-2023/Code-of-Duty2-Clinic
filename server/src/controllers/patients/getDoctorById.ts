import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { findDoctorById } from "../../services/doctors";

export const getDoctorById = async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  try {
    const doctor = await findDoctorById(doctorId);
    if (!doctor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(entityIdDoesNotExistError("doctor", doctorId));
    }
    res.status(StatusCodes.OK).json(doctor);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
