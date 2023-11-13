import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sendDoctorContract } from "../../services/doctors/registration_requests";
import {
  acceptDoctorRegistrationRequestService,
  rejectDoctorRegistrationRequestService,
} from "../../services/admins";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const acceptDoctorRegistrationRequest = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { username } = req.params;
  try {
    await acceptDoctorRegistrationRequestService(username);
    res.status(200).json({ message: "Request accepted" });
  } catch (error: any) {
    console.error("Error accepting request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const rejectDoctorRegistrationRequest = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { username } = req.params;
  try {
    await rejectDoctorRegistrationRequestService(username);
    res.status(200).json({ message: "Request rejected" });
  } catch (error: any) {
    console.error("Error rejecting request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const sendContract = async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  const contractUrl = req.body.contract;
  try {
    const request = await sendDoctorContract(doctorId, contractUrl);
    if (!request) {
      return res.status(StatusCodes.OK).json({ message: "Request not found" });
    }
    // Update the status of the request
    res.status(StatusCodes.OK).json({ message: "Contract Sent" });
  } catch (error: any) {
    console.error("Error rejecting request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
