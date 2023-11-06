import { Request, Response } from 'express';
import DoctorRegistrationRequestModel from '../../models/doctors/DoctorRegistrationRequest';
import DoctorModel, { IDoctorModel } from '../../models/doctors/Doctor'; 

export const acceptDoctorRegistrationRequest = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const request = await DoctorRegistrationRequestModel.findOne({ username });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Create a new Doctor document using the data from the request
    const newDoctor: IDoctorModel = new DoctorModel({
      username: request.username,
      password: request.password,
      email: request.email,
      name: request.name,
      gender: request.gender,
      mobileNumber: request.mobileNumber,
      dateOfBirth: request.dateOfBirth,
      hourlyRate: request.hourlyRate,
      affiliation: request.affiliation,
      educationalBackground: request.educationalBackground,
      speciality: request.speciality,
      availableSlots: request.availableSlots,
      identification: request.identification,
      medicalLicense: request.medicalLicense,
      medicalDegree: request.medicalDegree,
      wallet: { amount: 0 },
      contract: '',
      contractStatus: 'accepted'
    });

    await newDoctor.save();

    request.status = 'accepted';

    await request.save();

    res.status(200).json({ message: 'Request accepted' });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const rejectDoctorRegistrationRequest = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const request = await DoctorRegistrationRequestModel.findOne({ username });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update the status of the request
    request.status = 'rejected';
    await request.save();

    res.status(200).json({ message: 'Request rejected' });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
