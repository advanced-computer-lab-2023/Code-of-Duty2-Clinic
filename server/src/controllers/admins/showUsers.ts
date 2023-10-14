import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Patient from '../../models/patients/Patient';
import Doctor from '../../models/doctors/Doctor';
import Admin from '../../models/admins/Admin';

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
      return res.status(400).json({ message: 'Invalid user type' });
    }

    // Return the list of users based on their type
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export default viewUsersByType;
