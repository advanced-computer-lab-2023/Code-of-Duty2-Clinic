import { Request, Response } from "express";
import DoctorRegistrationRequestModel from "../../models/doctors/DoctorRegistrationRequest";
import DoctorModel, { IDoctorModel } from "../../models/doctors/Doctor";
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
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
