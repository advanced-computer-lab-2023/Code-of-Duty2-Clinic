import { Request, Response } from 'express';
import { findAllDoctorRegistrationRequests } from '../../services/doctors/registration_requests';
import { StatusCodes } from 'http-status-codes';


 const getDoctorRegistrationRequests = async (req: Request, res: Response) => {
  try {
    const requests = await findAllDoctorRegistrationRequests();
    res.status(StatusCodes.OK).json(requests);
  } catch (error: any) {
    console.error('Error fetching doctor registration request:', error);
    res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};
export default getDoctorRegistrationRequests;
