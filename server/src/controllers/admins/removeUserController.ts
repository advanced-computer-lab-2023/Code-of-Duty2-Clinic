import { Request, Response } from 'express';
import mongoose from 'mongoose';

import PatientModel from '../../models/patients/Patient';
import DoctorModel from '../../models/doctors/Doctor';
import AdminModel from '../../models/admins/Admin';

async function removeUser(req: Request, res: Response) {
  try {
    const { username,Type } = req.body;
     let user;
    if(Type=='Patient'){
       user =(await PatientModel.findOne({ username: username }))}
    else if(Type=='Doctor'){
       user = (await DoctorModel.findOne({ username: username }))}
    else{
       user = (await AdminModel.findOne({ username: username }));}
      if (!user) {
        return res.status(404).json({ message: 'User not found', username: username });
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