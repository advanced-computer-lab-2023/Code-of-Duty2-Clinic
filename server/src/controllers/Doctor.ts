import Doctor, { IDoctorModel } from '../models/doctors/Doctor';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Patient from '../models/patients/Patient';
import HealthPackage from '../models/health_packages/HealthPackage';

export const updateDoctor = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'affiliation', 'hourlyRate'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid updates!' });
  }

  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).send({error: `No doctor with ${req.params.id} exists`});
    }

    updates.forEach((update) => doctor[update] = req.body[update]);
    await doctor.save();

    res.send(doctor);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(e);
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const patinetId = req.params.id;
    const patient = await Patient.findById(patinetId);
    const subscribedPackage = patient?.subscribedPackage;
    const packageDetails = await HealthPackage.findById(subscribedPackage?.packageId);
    const allDoctors = await Doctor.find().select({name: 1, email: 1, mobileNumber: 1, hourlyRate: 1, affiliation: 1, speciality: 1});

    const doctorsRequiredInfo = allDoctors.map((doctor) => ({...doctor, sessionPrice: doctor.hourlyRate * (packageDetails?.discounts.gainedDoctorSessionDiscount || 1)}))
    res.status(StatusCodes.ACCEPTED).json(doctorsRequiredInfo);
  } catch(e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
}
