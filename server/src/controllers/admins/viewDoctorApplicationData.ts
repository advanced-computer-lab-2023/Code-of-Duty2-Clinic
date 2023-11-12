import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findDoctorRegistrationRequestByEmail } from "../../services/doctors/registration_requests";

const getDoctorRegistrationRequest = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const request = await findDoctorRegistrationRequestByEmail(email);

    if (!request) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Doctor registration request not found" });
    }

    res.json(request);
  } catch (error) {
    console.error("Error fetching doctor registration request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};
export default getDoctorRegistrationRequest;
