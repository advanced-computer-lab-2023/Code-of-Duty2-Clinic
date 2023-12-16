import { Response } from "express";
import PrescriptionModel from "../../models/prescriptions/Prescription";
import Appointment from "../../models/appointments/Appointment";
import Doctor from "../../models/doctors/Doctor";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import DependentFamilyMemberAppointment from "../../models/appointments/DependentFamilyMemberAppointment";
import DependentPrescription from "../../models/prescriptions/DependentPrescription";
import { findPatientById } from "../../services/patients";
import { nodeModuleNameResolver } from "typescript";
import Patient from "../../models/patients/Patient";

export default async function getRegisteredPatientDetails(req: AuthorizedRequest, res: Response) {
  try {
    const doctorId = req.user?.id;
    const { patientId } = req.params; // Extract patientId from request parameters

    const supervisingPatientId = req.query.supervisingPatientId as string;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Doctor not found" });
    }

    let patient;
    let supervisingPatientName: string | null = null;
    if (supervisingPatientId) {
      const supervisingPatient = await Patient.findById(supervisingPatientId)
        .select("+dependentFamilyMembers")
        .lean();

      if (!supervisingPatient?.dependentFamilyMembers) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Supervising patient not found" });
      }
      supervisingPatientName = supervisingPatient.name;

      patient = supervisingPatient.dependentFamilyMembers.find(
        (member) => member.nationalId === patientId
      );
    } else {
      patient = await Patient.findById(patientId)
        .select({
          name: 1,
          email: 1,
          gender: 1,
          emergencyContact: 1,
          healthRecords: 1,
          dateOfBirth: 1,
          mobileNumber: 1,
          imageUrl: 1
        })
        .lean();
    }

    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Patient not found" });
    }
    const appointment = supervisingPatientId
      ? await DependentFamilyMemberAppointment.findOne({
          doctorId,
          dependentNationalId: patientId,
          payerId: supervisingPatientId,
          status: "completed"
        })
      : await Appointment.findOne({
          doctorId,
          patientId,
          status: "completed"
        });

    if (!appointment) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "not authorized to view this patient info" });
    }

    const prescriptions = supervisingPatientId
      ? await DependentPrescription.find({
          patientNationalId: patientId,
          supervisingPatientId,
          doctorId
        })
      : await PrescriptionModel.find({
          patientId,
          doctorId
        });

    return res.status(StatusCodes.OK).json({
      patientInfo: { ...patient, supervisingPatientName },
      prescriptions: prescriptions
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
}
