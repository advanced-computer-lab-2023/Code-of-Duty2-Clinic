import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import Patient from "../../models/patients/Patient";
import Doctor from "../../models/doctors/Doctor";
import { StatusCodes } from "http-status-codes";

export const getPatientDoctorGeneralInfo = async (req: AuthorizedRequest, res: Response) => {
  try {
    const patientId = req.user?.id;
    const { doctorId, supervisingPatientId } = req.query;
    var patient;
    if (supervisingPatientId) {
      const parent = await Patient.findOne({ _id: patientId }).select({ name: 1 });
      const dependent = parent?.dependentFamilyMembers?.find(
        (dependentFamilyMember) => dependentFamilyMember.nationalId.toString() === patientId
      );
    } else {
      patient = await Patient.findOne({ _id: patientId }).select({ name: 1 });
      console.log(patient)
    }

    const doctor = await Doctor.findOne({ _id: doctorId }).select({ name: 1, speciality: 1 });
    const resData = {
      doctorName: doctor?.name,
      doctorSpeciality: doctor?.speciality,
      patientName: patient?.name
    };
    console.log(resData);
    res.status(StatusCodes.OK).json(resData);
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).send(err.message);
  }
};
