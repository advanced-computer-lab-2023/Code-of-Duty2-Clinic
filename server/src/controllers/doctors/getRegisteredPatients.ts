import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import Doctor from "../../models/doctors/Doctor";
import Appointment from "../../models/appointments/Appointment";
import mongoose from "mongoose";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const getRegisteredPatients = async(req: AuthorizedRequest, res: Response) => {

  const doctorId  = req.user?.id;
  if(!doctorId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'doctorId is required'});
  
  const allowedQueryParameters = ['patientName'];
  if(Object.keys(req.query).length > allowedQueryParameters.length || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
      return res.status(StatusCodes.BAD_REQUEST).json("only patient name must be provided");
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    if(!doctor) return res.status(StatusCodes.NOT_FOUND).json({message: entityIdDoesNotExistError('Doctor', doctorId)});

    const patientName  = req.query.patientName || "";

    const registeredPatients = await Appointment.aggregate([
      { $match: { doctorId: new mongoose.Types.ObjectId(doctorId), status: 'completed' } },
      {
          $lookup: {
              from: 'patients',
              localField: 'patientId',
              foreignField: '_id',
              as: 'patient',
          }
      },
      { $match: { ['patient.name']: { $regex: `^${patientName}`, $options: 'i' } } },
      { $unwind: '$patient' },
      { 
          $group: {
              _id: '$patient._id',
              name: { $first: '$patient.name' },
              gender: { $first: '$patient.gender' },
              imageUrl: { $first: '$patient.imageUrl' },
          }
      },
      { 
        $project: { 
          _id: 0,
          id: '$_id',
          name: 1,
          gender: 1,
          imageUrl: 1,
        } 
      }
    ]);
  
    res.status(StatusCodes.OK).json(registeredPatients);

  } catch(error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};