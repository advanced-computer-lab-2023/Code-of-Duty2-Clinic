import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { updateInfo } from '../../services/doctors';


export const updateDoctor = async (req: AuthorizedRequest, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'affiliation', 'hourlyRate'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid updates!' });
  }
  
  const doctorId = req.user?.id;
  if(!doctorId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'doctorId is required'});

  try {
    await updateInfo(doctorId, req.body);
    res.status(StatusCodes.OK).json(req.body);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(e);
  }
};
