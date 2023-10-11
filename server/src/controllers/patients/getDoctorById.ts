import Doctor from '../../models/doctors/Doctor';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { entityIdDoesNotExistError } from '../../utils/ErrorMessages';


export const getDoctorById = async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  try {
    const doctor = await Doctor.findById(doctorId).select({ _id: 1, name: 1, email: 1, mobileNumber: 1, hourlyRate: 1, affiliation: 1, speciality: 1, educationalBackground: 1, availableSlots: 1 });
    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).json(entityIdDoesNotExistError('doctor', doctorId));
    }
    res.status(StatusCodes.OK).json(doctor);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
