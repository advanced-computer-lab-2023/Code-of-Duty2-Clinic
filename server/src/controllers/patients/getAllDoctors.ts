import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { getAllDoctorsRequiredInfo } from '../../services/doctors';


export const getAllDoctors = async (req: AuthorizedRequest, res: Response) => {

  const allowedQueryParameters = ['name', 'speciality', 'availabilityTime', 'isTimeSet'];

  if(Object.keys(req.query).length > allowedQueryParameters.length || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
    return res.status(StatusCodes.BAD_REQUEST).json("only doctor name, speciality or time slot must be provided");
  }

  if(req.query.availabilityTime && !req.query.isTimeSet || req.query.isTimeSet && !req.query.availabilityTime) {
    return res.status(StatusCodes.BAD_REQUEST).json("isTimeSet and availabilityTime must be provided together");
  }

  const patientId = req.user?.id;
  if(!patientId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'patientId is required'});

  try {
    const doctorsRequiredInfo = await getAllDoctorsRequiredInfo(patientId, req.query);
    console.log(doctorsRequiredInfo);
    res.status(StatusCodes.OK).json(doctorsRequiredInfo);

  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
