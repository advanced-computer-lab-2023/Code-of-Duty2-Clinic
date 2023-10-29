import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import Doctor from '../../models/doctors/Doctor';
import Admin from '../../models/admins/Admin';
import { StatusCodes } from 'http-status-codes';

async function viewUsersByType(req: Request, res: Response) {
  try {
    const { Type } = req.params; // Extract the user type from the request params

    let users; // Declare a variable to store the retrieved users

    if (Type === 'Patient') {
      users = await Patient.find(); // Fetch all patients
    } else if (Type === 'Doctor') {
      users = await Doctor.find(); // Fetch all doctors
    } else if (Type === 'Admin') {
      users = await Admin.find(); // Fetch all admins
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user type' });
    }

    // Return the list of users based on their type
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
}

export default viewUsersByType;
