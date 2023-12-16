import mongoose from "mongoose";
import Appointment from "../../models/appointments/Appointment";
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
import bcrypt from "bcrypt";
import DependentFamilyMemberAppointment from "../../models/appointments/DependentFamilyMemberAppointment";
import { findPatientById } from "../patients";

export const findAllDoctors = async () => await Doctor.find();

export const findDoctorById = async (id: string, elementsToSelect?: any) =>
  await Doctor.findById(id).select(
    elementsToSelect || {
      _id: 1,
      name: 1,
      email: 1,
      mobileNumber: 1,
      hourlyRate: 1,
      affiliation: 1,
      speciality: 1,
      educationalBackground: 1,
      availableSlots: 1,
    }
  );

export const findDoctorByUsername = async (
  username: string,
  elementsToSelect?: any
) => {
  return await Doctor.findOne({ username }).select(
    elementsToSelect || { _id: 1, password: 1 }
  );
};
export const findDoctorByEmail = async (
  email: string,
  elementsToSelect?: any
) => {
  const PromisedDoctor = Doctor.findOne({ email });
  return await PromisedDoctor.select(
    elementsToSelect || { _id: 1, password: 1 }
  );
};

export const deleteDoctorById = async (id: string) =>
  await Doctor.findByIdAndDelete(id);

export const createNewDoctor = async (username: string, password: string) => {
  const newDoctor = new Doctor({ username, password });
  await newDoctor.save();
};

type DoctorInfoToUpdate = {
  email?: string;
  hourlyRate?: number;
  affiliation?: string;
};

enum DoctorFieldsToUpdate {
  "email" = "email",
  "hourlyRate" = "hourlyRate",
  "affiliation" = "affiliation",
}
export const updateInfo = async (
  doctorId: string,
  updatedInfo: DoctorInfoToUpdate
) => {
  const doctor = (await findDoctorById(doctorId)) as DoctorInfoToUpdate;
  const updates = Object.keys(updatedInfo) as DoctorFieldsToUpdate[];

  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("doctor", doctorId));
  }

  updates.forEach(
    (update: DoctorFieldsToUpdate) =>
      ((doctor[update] as string | number | undefined) = updatedInfo[update])
  );
  await (doctor as IDoctorModel).save();
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
  await doctor.storePassword?.(newPassword);
};

export const validateDoctorPassword = async (
  doctor: IDoctorModel,
  password: string
) => {
  const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
  return isPasswordCorrect;
};

export const addWorkingSchedule = async (
  doctorId: string,
  {
    daysOff,
    workingHours,
  }: {
    daysOff: string[];
    workingHours: { startTime: string; endTime: string }[];
  }
) => {
  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new Error(entityIdDoesNotExistError("doctor", doctorId));
  }

  doctor.workingSchedule = {
    daysOff,
    dailyWorkingHours: workingHours,
  };
  await doctor.save();
};

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

  const searchQuery = getMatchingDoctorsQueryFields(urlQuery);

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
function getMatchingDoctorsQueryFields(urlQuery: DoctorUrlQuery) {
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

export const getDoctorPatients = async (
  doctorId: string,
  patientName: string
) => {
  const doctor = await findDoctorById(doctorId, {
    _id: 1,
    name: 1,
    email: 1,
    mobileNumber: 1,
    imageUrl: 1,
  });
  if (!doctor) throw new Error(entityIdDoesNotExistError("doctor", doctorId));

  const registeredPatients = await getRegisteredDoctorPatients(
    doctorId,
    patientName
  );

  const dependentPatients = await getDependentDoctorPatients(
    doctorId,
    patientName
  );
  return registeredPatients.concat(dependentPatients);
};

const getRegisteredDoctorPatients = async (
  doctorId: string,
  patientName: string
) => {
  return await Appointment.aggregate([
    {
      $match: {
        doctorId: new mongoose.Types.ObjectId(doctorId),
        status: "completed",
      },
    },
    {
      $lookup: {
        from: "patients",
        localField: "patientId",
        foreignField: "_id",
        as: "patient",
      },
    },
    {
      $match: {
        ["patient.name"]: { $regex: `^${patientName}`, $options: "i" },
      },
    },
    { $unwind: "$patient" },
    {
      $group: {
        _id: "$patient._id",
        name: { $first: "$patient.name" },
        gender: { $first: "$patient.gender" },
        imageUrl: { $first: "$patient.imageUrl" },
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: 1,
        gender: 1,
        imageUrl: 1,
      },
    },
  ]);
};

const getDependentDoctorPatients = async (
  doctorId: string,
  patientName: string
) => {
  const appointments = await DependentFamilyMemberAppointment.find({
    doctorId,
  });
  const result = [];
  for (const appointment of appointments) {
    if (appointment.status !== "completed") {
      continue;
    }
    const patient = await findPatientById(
      appointment.payerId.toString(),
      "+dependentFamilyMembers"
    );
    if (!patient) {
      throw new Error(
        entityIdDoesNotExistError("patient", appointment.payerId.toString())
      );
    }
    if (!patient.dependentFamilyMembers) {
      continue;
    }

    const dependentMember = patient.dependentFamilyMembers.find(
      (dependentMember) =>
        dependentMember.nationalId === appointment.dependentNationalId
    );

    if (
      patientName &&
      !dependentMember?.name.toLowerCase().startsWith(patientName.toLowerCase())
    ) {
      continue;
    }
    result.push({
      id: dependentMember?.nationalId,
      name: dependentMember?.name,
      gender: dependentMember?.gender,
      supervisingPatientId: appointment.payerId,
    });
  }
  return result;
};
