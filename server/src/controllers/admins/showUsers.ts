import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import Doctor from '../../models/doctors/Doctor';
import Admin from '../../models/admins/Admin';
import { StatusCodes } from 'http-status-codes';
import { findAllUsersByType } from '../../services/users';

async function viewUsersByTypeHandler(req: Request, res: Response) {
  try {
    const { Type } = req.params; // Extract the user type from the request params

    const users = await findAllUsersByType(Type);

    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Server error' });
  }
}

export default viewUsersByTypeHandler;
