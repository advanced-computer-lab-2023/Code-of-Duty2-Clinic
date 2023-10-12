import Doctor from '../../models/doctors/Doctor';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export const getMatchingDoctors = async (req: Request, res: Response) => {

  const allowedQueryParameters = ['name', 'speciality', 'date', 'time'];

  if(Object.keys(req.query).length > 4 || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
    res.status(StatusCodes.BAD_REQUEST).json("only doctor name, speciality or time slot must be provided");
    return;
  }
  const { name, speciality, date, time } = req.query;

  try {
    let query: any = {};

    if (name && name !== '') {
      query.name = new RegExp('^' + name, 'i');
    }
    if (speciality && speciality !== '') {
      query.speciality = speciality;
    }
    if (date && date !== '') {
      const requestedDateTime = new Date(`${date}${(time && time !== '' ) && `T${time}`}`);
      query['availableSlots'] = {
        $elemMatch: {
          startTime: { $lte: requestedDateTime },
          endTime: { $gte: requestedDateTime }
        }
      };
    }
    const matchingDoctors = await Doctor.find({
      $or: Object.keys(query).map(key => (
        { [key]: query[key] }
      ))
    });

    res.status(StatusCodes.OK).json(matchingDoctors);

  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
