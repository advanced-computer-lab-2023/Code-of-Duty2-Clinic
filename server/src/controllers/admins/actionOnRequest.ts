import { Request, Response } from "express";
import DoctorRegistrationRequestModel from "../../models/doctors/DoctorRegistrationRequest";
import DoctorModel, { IDoctorModel } from "../../models/doctors/Doctor";
import { StatusCodes } from "http-status-codes";
import { sendDoctorContract } from "../../services/doctors/registration_requests";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const acceptDoctorRegistrationRequest = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { username } = req.params;

  try {
    const request = await DoctorRegistrationRequestModel.findOne({ _id:req.user?.id })
      .select({
        password:1,
        username: 1,
        email:1, 
        name:1, 
        gender:1, 
        mobileNumber:1, 
        dateOfBirth:1, 
        hourlyRate:1, 
        affiliation:1, 
        educationalBackground:1, 
        speciality:1, 
        identification:1, 
        medicalLicense:1, 
        medicalDegree:1, 
        contractUrl:1,          
      });
    console.log(request)
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    

    // Create a new Doctor document using the data from the request
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
      identification: request.identification,
      medicalLicense: request.medicalLicense,
      medicalDegree: request.medicalDegree,
      wallet: { amount: 0 },
      contract: request.contractUrl,
      contractStatus: "accepted",
    });

    await newDoctor.save();

    request.status = "accepted";

    await request.save();

    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectDoctorRegistrationRequest = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;

  try {
    const request = await DoctorRegistrationRequestModel.findOne({ username });
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update the status of the request
    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Request rejected" });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const sendContract = async (req: Request,res: Response) => {
  const { doctorId } = req.params;
  const contractUrl = req.body.contract
  try {
    const request = await sendDoctorContract(doctorId,contractUrl);
    if (!request) {
      return res.status(StatusCodes.OK).json({ message: "Request not found" });
    }
    // Update the status of the request
    res.status(200).json({ message: "Contract Sent" });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};