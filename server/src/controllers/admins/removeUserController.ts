import { Request, Response } from 'express';
import mongoose from 'mongoose';

import PatientModel from '../../models/patients/Patient';
import DoctorModel from '../../models/doctors/Doctor';
import AdminModel from '../../models/admins/Admin';

async function removeUser(req: Request, res: Response) {
  try {
    const { userName } = req.params;
    
    const user =
      (await PatientModel.findOne({ username: userName })) ||
      (await DoctorModel.findOne({ username: userName })) ||
      (await AdminModel.findOne({ username: userName }));

      if (!user) {
        return res.status(404).json({ message: 'User not found', username: userName });
      }
    

    if (user instanceof PatientModel) {
      await PatientModel.findByIdAndDelete(user._id);
    } else if (user instanceof DoctorModel) {
      await DoctorModel.findByIdAndDelete(user._id);
    } else if (user instanceof AdminModel) {
      await AdminModel.findByIdAndDelete(user._id);
    }

    res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export default removeUser;