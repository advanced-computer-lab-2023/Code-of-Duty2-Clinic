import Doctor from '../../models/doctors/Doctor';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { entityIdDoesNotExistError } from '../../utils/ErrorMessages';


export const updateDoctor = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'affiliation', 'hourlyRate'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid updates!' });
  }
  const doctorId = req.params.doctorId;
  try {
    const doctor = await Doctor.findById(req.params.doctorId);

    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).json(entityIdDoesNotExistError('doctor', doctorId));
    }

    updates.forEach((update) => doctor[update] = req.body[update]);
    await doctor.save();

    res.status(StatusCodes.OK).json(doctor);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(e);
  }
};
