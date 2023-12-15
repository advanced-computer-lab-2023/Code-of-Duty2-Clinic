import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { findPatientById } from "../../services/patients";

export const getPatientById = async (req: Request, res: Response) => {
  const id = req.params.patientId;
  const patient = await findPatientById(id, {
    _id: 1,
    name: 1,
    email: 1,
    imageUrl: 1,
  });

  if (!patient) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "No such patient found" });
  }
  return res
    .status(StatusCodes.OK)
    .json({
      id: patient._id,
      name: patient.name,
      email: patient.email,
      imageUrl: patient.imageUrl,
    });
};
