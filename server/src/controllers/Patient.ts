import Doctor, { IDoctorModel } from '../models/doctors/Doctor';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Patient from '../models/patients/Patient';
import HealthPackage, { IHealthPackageModel } from '../models/health_packages/HealthPackage';
import { entityIdDoesNotExistError } from '../utils/ErrorMessages';

export const getAllDoctors = async (req: Request, res: Response) => {
    const patientId = req.params.patientId;
    try {
      const patient = await Patient.findById(patientId);
      if(!patient) {
        
        return res.status(StatusCodes.NOT_FOUND).json(entityIdDoesNotExistError('patient', patientId));
      }

      const subscribedPackage = patient?.subscribedPackage;
      const packageDetails = subscribedPackage ? await HealthPackage.findById(subscribedPackage?.packageId): null;
      const allDoctors = await Doctor.find({contractStatus: 'accepted'}).select({name: 1, email: 1, mobileNumber: 1, hourlyRate: 1, affiliation: 1, speciality: 1});

      const doctorsRequiredInfo = getDoctorRequiredInfo(allDoctors, packageDetails);
  
      res.status(StatusCodes.OK).json(doctorsRequiredInfo);
      
    } catch(err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}

function getRequiredSessionPrice(doctorHourlyRate: number, healthPackageDetails: IHealthPackageModel | null): number {
    let discountAmount = healthPackageDetails?.discounts.gainedDoctorSessionDiscount || 0;
    console.log(discountAmount);
    return doctorHourlyRate  - doctorHourlyRate * discountAmount;
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


export const getMatchingDoctors = async (req: Request, res: Response) => {

  if(Object.keys(req.query).length == 0) {
    res.status(StatusCodes.BAD_REQUEST).json("doctor name or speciality must be provided");
    return;
  }
  const { name, speciality, date, time } = req.query;

  try {
    let query: any = {};

    if(name) {
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
        {[key]: query[key]}
      ))
    });

    res.status(StatusCodes.OK).json(matchingDoctors);

  } catch(err) {
    res.status(StatusCodes.BAD_REQUEST).send(err)
  }
}

export const getDoctorById = async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if(! doctor) {
      return res.status(StatusCodes.NOT_FOUND).json(entityIdDoesNotExistError('doctor', doctorId));
    }
    res.status(StatusCodes.OK).json(doctor);
  } catch(err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  } 
}

export const addFamilyMembers = async(req: Request, res: Response) => {
  const patientId = req.params.patientId;
  try {
    let patient = await Patient.findById(patientId);
    if(! patient) {
      return res.status(StatusCodes.NOT_FOUND).json(entityIdDoesNotExistError('patient', patientId));
    }
    const dependentFamilyMembersNumber = patient.dependentFamilyMembers?.length || 0;

    if(! patient.dependentFamilyMembers) {
      patient.dependentFamilyMembers = [];
    }
    patient.dependentFamilyMembers?.push(req.body);
    patient = await patient.save();

    res.status(StatusCodes.CREATED).json(patient.dependentFamilyMembers?.[dependentFamilyMembersNumber]);

  } catch(err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
}