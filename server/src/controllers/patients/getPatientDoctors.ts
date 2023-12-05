import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { getPatientDoctors } from "../../services/patients";

export const getPatientDoctorsHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id;
  if (!patientId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "patientId is required" });

  const allowedQueryParameters = ["doctorName"];
  if (
    Object.keys(req.query).length > allowedQueryParameters.length ||
    Object.keys(req.query).some((key) => !allowedQueryParameters.includes(key))
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("only doctor name must be provided");
  }

  try {
    const doctorName = (req.query.doctorName as string | undefined) || "";
    const doctors = await getPatientDoctors(patientId, doctorName);
    res.status(StatusCodes.OK).json(doctors);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
