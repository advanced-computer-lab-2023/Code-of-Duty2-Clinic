import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { addAvailableSlots } from '../../services/doctors';
import Appointment from '../../models/appointments/Appointment';
import Doctor from '../../models/doctors/Doctor';

export const addDoctorAvailableSlots = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { startTime, endTime } = req.body;
    const doctorId = req.user?.id!;

    const doctor = await Doctor.findById(doctorId).select('+availableSlots');

    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Doctor not found' });
    }


    const existingAppointment = await Appointment.findOne({
      doctorId: doctorId,
      'timePeriod.startTime': { $lt: endTime },
      'timePeriod.endTime': { $gt: startTime },
    });

    if (existingAppointment) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'This time slot is occupied with an appointment' });
    }

    const existingAvailableSlot = doctor?.availableSlots.find((slot) => slot.startTime === startTime || slot.endTime === endTime);

    if (existingAvailableSlot) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'This time slot is already added' });
    }

    
    await addAvailableSlots(doctorId, startTime, endTime);

    return res.status(StatusCodes.OK).json({ message: 'Available time slots added successfully!' });

  } catch (error) {

    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while adding time slots' });
  }
};
