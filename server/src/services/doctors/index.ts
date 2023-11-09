import { getClinicCommission } from "../../models/clinic/Clinic";
import Doctor, { IDoctorModel } from "../../models/doctors/Doctor";
import HealthPackage, {
  IHealthPackageModel,
} from "../../models/health_packages/HealthPackage";
import Patient from "../../models/patients/Patient";
import {
  entityEmailDoesNotExistError,
  entityIdDoesNotExistError,
} from "../../utils/ErrorMessages";
import { getRequestedTimePeriod } from "../../utils/getRequestedTimePeriod";
import bcrypt from 'bcrypt';

export const findAllDoctors = async () => await Doctor.find();

export const findDoctorById = async (id: string) =>
  await Doctor.findById(id).select({
    _id: 1,
    name: 1,
    email: 1,
    mobileNumber: 1,
    hourlyRate: 1,
    affiliation: 1,
    speciality: 1,
    educationalBackground: 1,
    availableSlots: 1,
  });

export const findDoctorByUsername = async (username: string) =>
  await Doctor.findOne({ username }).select({ _id: 1, password: 1 });

export const findDoctorByEmail = async (
  email: string,
  elementsToSelect?: any
) => {
  const PromisedDoctor = Doctor.findOne({ email });
  if (!elementsToSelect)
    return await PromisedDoctor.select({ _id: 1, password: 1 });
  return await PromisedDoctor.select(elementsToSelect);
};

export const deleteDoctorById = async (id: string) =>
  await Doctor.findByIdAndDelete(id);

export const createNewDoctor = async (username: string, password: string) => {
  const newDoctor = new Doctor({ username, password });
  await newDoctor.save();
};

export const updateInfo = async (doctorId: string, updatedInfo: any) => {
  const doctor = await findDoctorById(doctorId);
  const updates = Object.keys(updatedInfo);

  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("doctor", doctorId));
  }

  updates.forEach((update) => (doctor[update] = updatedInfo[update]));
  await doctor.save();
};

export const updateDoctorPasswordByEmail = async (
  email: string,
  newPassword: string
) => {
  const doctor = await findDoctorByEmail(email);
  if (!doctor) {
    throw new Error(entityEmailDoesNotExistError("doctor", email));
  }
  await updateDoctorPassword(doctor, newPassword);
};

export const updatePasswordById = async (
  doctorId: string,
  newPassword: string
) => {
  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("doctor", doctorId));
  }
  await updateDoctorPassword(doctor, newPassword);
};

export const updateDoctorPassword = async (
  doctor: IDoctorModel,
  newPassword: string
) => {
  doctor.password = newPassword;
  await doctor.save();
};

export const validateDoctorPassword = async (doctor: IDoctorModel, password: string) => {
    const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
    return isPasswordCorrect;
  }

export const addAvailableSlots = async (doctorID: string, startTime: Date, endTime: Date) => {
    const doctor = await findDoctorById(doctorID);
    if (!doctor) {
        throw new Error(entityIdDoesNotExistError('doctor', doctorID));
    }
    doctor.availableSlots.push({ startTime: startTime, endTime: endTime });
    await doctor.save();
}

type DoctorInfo = {
  _id: string;
  name: string;
  speciality: string | undefined;
  sessionPrice: number;
};

export const getAllDoctorsRequiredInfo = async (
  patientId: string,
  urlQuery: any
): Promise<DoctorInfo[]> => {
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new Error(entityIdDoesNotExistError("patient", patientId));
  }

  const subscribedPackage = patient?.subscribedPackage;
  const packageDetails = subscribedPackage
    ? await HealthPackage.findById(subscribedPackage?.packageId)
    : null;

  const searchQuery = getMetchingDoctorsQueryFields(urlQuery);

  const allDoctors = await Doctor.find({
    contractStatus: "accepted",
    ...searchQuery,
  }).select({ _id: 1, name: 1, hourlyRate: 1, speciality: 1, imageUrl: 1 });

  return await getDoctorRequiredInfo(allDoctors, packageDetails);
};

async function getDoctorRequiredInfo(
  allDoctors: IDoctorModel[],
  packageDetails: IHealthPackageModel | null
) {
  return await Promise.all(
    allDoctors.map(async (doctor: IDoctorModel) => ({
      _id: doctor._id,
      name: doctor.name,
      speciality: doctor.speciality,
      sessionPrice: await getRequiredSessionPrice(
        doctor.hourlyRate,
        packageDetails
      ),
    }))
  );
}

async function getRequiredSessionPrice(
  doctorHourlyRate: number,
  healthPackageDetails: IHealthPackageModel | null
) {
  let discountAmount =
    healthPackageDetails?.discounts.gainedDoctorSessionDiscount || 0;
  let clinicCommission = (await getClinicCommission()) || 1;
  let originalAmountToPay =
    doctorHourlyRate + doctorHourlyRate * clinicCommission;
  return originalAmountToPay - originalAmountToPay * discountAmount;
}

type DoctorUrlQuery = {
  name?: string;
  speciality?: string;
  availabilityTime?: string;
  isTimeSet?: string;
};
type DoctorSearchQuery = {
  name?: { $regex: string; $options: string };
  speciality?: { $regex: string; $options: string };
  availableSlots?: { $elemMatch: { startTime: any; endTime: any } };
};

function getMetchingDoctorsQueryFields(urlQuery: DoctorUrlQuery) {
  const { name, speciality, availabilityTime } = urlQuery;
  const isTimeSet = urlQuery.isTimeSet === "true";

  let searchQuery: DoctorSearchQuery = {};

  if (name && name !== "") {
    searchQuery.name = { $regex: `^${name}`, $options: "i" };
  }
  if (speciality && speciality !== "") {
    searchQuery.speciality = { $regex: `^${speciality}`, $options: "i" };
  }

  if (availabilityTime && availabilityTime !== "") {
    const { requestedStartTime, requestedEndTime } = getRequestedTimePeriod(
      availabilityTime,
      isTimeSet
    );
    searchQuery.availableSlots = {
      $elemMatch: {
        startTime: { $lte: requestedStartTime },
        endTime: { $gte: requestedEndTime },
      },
    };
  }
  return searchQuery;
}
