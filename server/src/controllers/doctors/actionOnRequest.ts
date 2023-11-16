import { Request, Response } from "express";
import DoctorRegistrationRequestModel, {
  IDoctorRegistrationRequestModel,
} from "../../models/doctors/DoctorRegistrationRequest";
import DoctorModel, { IDoctorModel } from "../../models/doctors/Doctor";
import { StatusCodes } from "http-status-codes";
import { sendDoctorContract } from "../../services/doctors/registration_requests";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const acceptDoctorRegistrationRequest = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const request: IDoctorRegistrationRequestModel =
      await DoctorRegistrationRequestModel.findOne({
        _id: req.user?.id,
      }).select({
        password: 1,
        username: 1,
        email: 1,
        name: 1,
        gender: 1,
        mobileNumber: 1,
        dateOfBirth: 1,
        hourlyRate: 1,
        affiliation: 1,
        educationalBackground: 1,
        speciality: 1,
        identificationUrl: 1,
        medicalLicenseUrl: 1,
        medicalDegreeUrl: 1,
        contractUrl: 1,
      });

    if (!request) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Request not found" });
    }

    const doctor = await DoctorModel.findOne({ username: request.username });
    if (doctor) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Doctor already exists" });
    }
    const newDoctor: IDoctorModel = new DoctorModel({
      username: request.username,
      password: request.password,
      email: request.email,
      name: request.name,
      gender: request.gender,
      mobileNumber: request.mobileNumber,
      dateOfBirth: request.dateOfBirth,
      hourlyRate: request.hourlyRate,
      affiliation: request.affiliation,
      educationalBackground: request.educationalBackground,
      speciality: request.speciality,
      availableSlots: request.availableSlots,
      identificationUrl: request.identificationUrl,
      medicalLicenseUrl: request.medicalLicenseUrl,
      medicalDegreeUrl: request.medicalDegreeUrl,
      contractUrl: request.contractUrl,
      contractStatus: "accepted",
    });

    await newDoctor.save();

    request.status = "accepted";

    await request.save();

    res.status(StatusCodes.OK).json({ message: "Request accepted" });
  } catch (error: any) {
    console.error("Error accepting request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const rejectDoctorRegistrationRequest = async (
  req: Request,
  res: Response
) => {
  const { doctorId } = req.params;
  try {
    const request = await DoctorRegistrationRequestModel.findByIdAndUpdate(
      doctorId
    ).set({ status: "rejected" });
    if (!request) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Request not found" });
    }

    // Update the status of the request
    res.status(StatusCodes.OK).json({ message: "Request rejected" });
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
    res.status(StatusCodes.OK).json({ message: "Contract Sent" });
  } catch (error: any) {
    console.error("Error rejecting request:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
