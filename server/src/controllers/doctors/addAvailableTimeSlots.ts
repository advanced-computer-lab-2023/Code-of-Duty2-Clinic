import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { addAvailableSlots } from '../../services/doctors';

export const addDoctorAvailableSlots = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { startTime, endTime } = req.body;
    const doctorId = req.user?.id!;

    // if (!doctorId) {
    //   return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    // }

    
    await addAvailableSlots(doctorId, startTime, endTime);

    return res.status(StatusCodes.OK).json({ message: 'Available time slots added successfully!' });

  } catch (error) {

    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while adding time slots' });
  }
};
