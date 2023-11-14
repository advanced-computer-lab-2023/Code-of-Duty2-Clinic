import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { addNewFamilyMember } from "../../services/family-members";

export const addFamilyMembers = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id;
  if (!patientId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "patientId is required" });

  try {
    await addNewFamilyMember(patientId, req.body);
    res.status(StatusCodes.CREATED).json({ message: "Family member added" });
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
};
