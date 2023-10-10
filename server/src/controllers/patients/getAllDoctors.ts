import Doctor, { IDoctorModel } from '../../models/doctors/Doctor';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Patient from '../../models/patients/Patient';
import HealthPackage, { IHealthPackageModel } from '../../models/health_packages/HealthPackage';
import { entityIdDoesNotExistError } from '../../utils/ErrorMessages';


export const getAllDoctors = async (req: Request, res: Response) => {
  const patientId = req.params.patientId;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {

      return res.status(StatusCodes.NOT_FOUND).json(entityIdDoesNotExistError('patient', patientId));
    }

    const subscribedPackage = patient?.subscribedPackage;
    const packageDetails = subscribedPackage ? await HealthPackage.findById(subscribedPackage?.packageId) : null;
    const allDoctors = await Doctor.find({ contractStatus: 'accepted' }).select({ name: 1, email: 1, mobileNumber: 1, hourlyRate: 1, affiliation: 1, speciality: 1 });

    const doctorsRequiredInfo = getDoctorRequiredInfo(allDoctors, packageDetails);

    res.status(StatusCodes.OK).json(doctorsRequiredInfo);

  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};
function getRequiredSessionPrice(doctorHourlyRate: number, healthPackageDetails: IHealthPackageModel | null): number {
  let discountAmount = healthPackageDetails?.discounts.gainedDoctorSessionDiscount || 0;
  console.log(discountAmount);
  return doctorHourlyRate - doctorHourlyRate * discountAmount;
}
function getDoctorRequiredInfo(allDoctors: IDoctorModel[], packageDetails: IHealthPackageModel | null) {
  return allDoctors.map((doctor) => ({
    name: doctor.name,
    email: doctor.email,
    mobileNumber: doctor.mobileNumber,
    affiliation: doctor.affiliation,
    speciality: doctor.speciality,
    sessionPrice: getRequiredSessionPrice(doctor.hourlyRate, packageDetails),
  }));
}