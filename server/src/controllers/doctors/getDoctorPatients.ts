import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { getDoctorPatients } from "../../services/doctors";

export const getDoctorPatientsHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const doctorId = req.user?.id;
  if (!doctorId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "doctorId is required" });

  const allowedQueryParameters = ["patientName"];
  if (
    Object.keys(req.query).length > allowedQueryParameters.length ||
    Object.keys(req.query).some((key) => !allowedQueryParameters.includes(key))
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("only patient name must be provided");
  }

  try {
    const patientName = (req.query.patientName as string | undefined) || "";
    const patients = await getDoctorPatients(doctorId, patientName);
    res.status(StatusCodes.OK).json(patients);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
