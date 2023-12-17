import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { getDependentPatientDoctors, getPatientDoctors } from "../../services/patients";

export const getPatientDoctorsHandler = async (req: AuthorizedRequest, res: Response) => {
  const patientId = req.query.registeredPatientId || req.user?.id;
  if (!patientId)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "patientId is required" });

  const allowedQueryParameters = ["doctorName", "registeredPatientId"];
  if (
    Object.keys(req.query).length > allowedQueryParameters.length ||
    Object.keys(req.query).some((key) => !allowedQueryParameters.includes(key))
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json("only doctor name must be provided");
  }

  try {
    const doctorName = (req.query.doctorName as string | undefined) || "";
    const doctors = await getPatientDoctors(patientId as string, doctorName);
    res.status(StatusCodes.OK).json(doctors);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const getDependentPatientDoctorsHandler = async (req: AuthorizedRequest, res: Response) => {
  const supervisingPatientId = req.user?.id;
  if (!supervisingPatientId)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "patientId is required" });

  const dependentNationalId = req.query.dependentNationalId;

  const allowedQueryParameters = ["doctorName", "dependentNationalId"];
  if (
    Object.keys(req.query).length > allowedQueryParameters.length ||
    Object.keys(req.query).some((key) => !allowedQueryParameters.includes(key))
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json("only doctor name must be provided");
  }

  try {
    const doctorName = (req.query.doctorName as string | undefined) || "";
    const doctors = await getDependentPatientDoctors(
      supervisingPatientId,
      dependentNationalId as string,
      doctorName
    );
    res.status(StatusCodes.OK).json(doctors);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
