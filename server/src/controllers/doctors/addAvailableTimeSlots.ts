import { Request, Response } from 'express';
import Doctor from '../../models/doctors/Doctor';
import { StatusCodes } from 'http-status-codes';

export const addAvailableTimeSlotsForDoctor = async (req: Request, res: Response) => {
  try {

    const doctorId = req.params.doctorId; // msh 3arf ezay a get el Doctors ID mn mongo!

    
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Doctor not found' });
    }

    const { startTime, endTime } = req.body;

    doctor.availableSlots.push({
      startTime,
      endTime,
    });

    await doctor.save();

    res.status(StatusCodes.CREATED).json({ message: 'Time slot added successfully' });

  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while adding the time slot' });
  }
};