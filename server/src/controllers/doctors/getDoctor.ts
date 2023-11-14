import { Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { findDoctorById } from "../../services/doctors";

export const getDoctor = async (req: AuthorizedRequest, res: Response) => {
  try {
    const doctorId = req.user?.id!;
    const doctor = await findDoctorById(doctorId, {
      username: 1,
      email: 1,
      specilaity: 1,
      mobileNumber: 1,
      imageUrl: 1,
      contractStatus: 1,
    });
    res.status(StatusCodes.OK).json(doctor);
  } catch (err: any) {
    if (err instanceof mongoose.Error.CastError)
      return res.status(StatusCodes.NOT_FOUND).send("Doctor Not found");
    return res.send({ message: err.message });
  }
};
