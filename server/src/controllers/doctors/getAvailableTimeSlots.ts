import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import Doctor from '../../models/doctors/Doctor';

export const viewAvailableTimeSlots = async (req: AuthorizedRequest, res: Response) => {
    try {
      const doctorId = req.user?.id!; 
  
      const doctor = await Doctor.findById(doctorId).select('+availableSlots');
  
      if (!doctor) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Doctor not found' });
      }
  
      const availableTimeSlots = doctor.availableSlots;
  
      return res.status(StatusCodes.OK).json({ availableTimeSlots });

    } catch (error) {

      console.error(error);

      res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while fetching available time slots' });
    }
  };
  
