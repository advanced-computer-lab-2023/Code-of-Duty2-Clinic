import { Request, Response } from 'express';
import DoctorRegistrationRequestModel from '../../models/doctors/DoctorRegistrationRequest';
import { StatusCodes } from 'http-status-codes';


 const getDoctorRegistrationRequest = async (req: Request, res: Response) => {
  const email = req.params.email;

  try {
    const request = await DoctorRegistrationRequestModel.findOne({ email });

    if (!request) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Doctor registration request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error('Error fetching doctor registration request:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};
export default getDoctorRegistrationRequest;
