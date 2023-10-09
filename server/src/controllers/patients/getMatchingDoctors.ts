import Doctor from '../../models/doctors/Doctor';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export const getMatchingDoctors = async (req: Request, res: Response) => {

  if (Object.keys(req.query).length == 0) {
    res.status(StatusCodes.BAD_REQUEST).json("doctor name or speciality must be provided");
    return;
  }
  const { name, speciality, date, time } = req.query;

  try {
    let query: any = {};

    if (name) {
      query.name = new RegExp('^' + name, 'i');
    }
    if (speciality) {
      query.speciality = speciality;
    }
    if (date) {
      const requestedDateTime = new Date(`${date}${time && `T${time}`}`);
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
