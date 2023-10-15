import Doctor, { IDoctorModel } from '../../models/doctors/Doctor';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Patient from '../../models/patients/Patient';
import HealthPackage, { IHealthPackageModel } from '../../models/health_packages/HealthPackage';
import { entityIdDoesNotExistError } from '../../utils/ErrorMessages';
import { getClinicCommission } from '../../models/clinic/Clinic';


export const getAllDoctors = async (req: Request, res: Response) => {

  const allowedQueryParameters = ['name', 'speciality', 'availabilityTime'];

  if(Object.keys(req.query).length > allowedQueryParameters.length || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
    res.status(StatusCodes.BAD_REQUEST).json("only doctor name, speciality or time slot must be provided");
    return;
  }

  const patientId = req.params.patientId;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json(entityIdDoesNotExistError('patient', patientId));
    }

    const subscribedPackage = patient?.subscribedPackage;
    const packageDetails = subscribedPackage ? await HealthPackage.findById(subscribedPackage?.packageId) : null;

    const searchQuery = getMetchingDoctorsQueryFields(req.query);
    const queries = Object.keys(searchQuery).map(key => (
      { [key]: searchQuery[key] }
    ));

    const allDoctors =  await (queries.length > 0 ? 
      Doctor.find({
        contractStatus: 'accepted', 
        $or: queries,
      }) : 
      Doctor.find({
        contractStatus: 'accepted'
      })
      ).select({ _id: 1, name: 1, hourlyRate: 1, speciality: 1});

    const doctorsRequiredInfo = await getDoctorRequiredInfo(allDoctors, packageDetails);

    res.status(StatusCodes.OK).json(doctorsRequiredInfo);

  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};


async function getDoctorRequiredInfo(allDoctors: IDoctorModel[], packageDetails: IHealthPackageModel | null) {
  return await Promise.all(allDoctors.map(async (doctor) => ({
    _id: doctor._id,
    name: doctor.name,
    email: doctor.email,
    mobileNumber: doctor.mobileNumber,
    affiliation: doctor.affiliation,
    speciality: doctor.speciality,
    sessionPrice: await getRequiredSessionPrice(doctor.hourlyRate, packageDetails),
    educationalBackground: doctor.educationalBackground,
  })));
}

async function getRequiredSessionPrice(doctorHourlyRate: number, healthPackageDetails: IHealthPackageModel | null) {
  let discountAmount = healthPackageDetails?.discounts.gainedDoctorSessionDiscount || 0;
  let clinicCommission = await getClinicCommission() || 1;
  let originalAmountToPay = doctorHourlyRate +  doctorHourlyRate * clinicCommission;
  return originalAmountToPay - originalAmountToPay * discountAmount;
}

function getMetchingDoctorsQueryFields(urlQuery: any) {
  
  const { name, speciality, availabilityTime } = urlQuery;

    let searchQuery: any = {};
   
    if (name && name !== '') {
      searchQuery.name = new RegExp('^' + name, 'i');
    }
    if (speciality && speciality !== '') {
      searchQuery.speciality = speciality;
    }

  
    if (availabilityTime && availabilityTime !== '') {
      const requestedStartDate = new Date(availabilityTime).setSeconds(59, 999);
      const requestedEndDate = new Date(availabilityTime).setSeconds(0, 0);

      searchQuery.availableSlots = {
        $elemMatch: {
          startTime: { $lte: requestedStartDate },
          endTime: { $gte: requestedEndDate }
        }
      };
    }
    return searchQuery;
}
