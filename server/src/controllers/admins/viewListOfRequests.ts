import { Request, Response } from 'express';
import DoctorRegistrationRequestModel from '../../models/doctors/DoctorRegistrationRequest';


 const getDoctorRegistrationRequests = async (req: Request, res: Response) => {
  try {
    const request = await DoctorRegistrationRequestModel.find();

    if (!request) {
      return res.status(404).json({ message: 'Doctor registration request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error('Error fetching doctor registration request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export default getDoctorRegistrationRequests;
