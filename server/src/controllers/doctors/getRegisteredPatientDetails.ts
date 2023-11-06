import { Response } from 'express';
import PatientModel, { IPatientModel } from '../../models/patients/Patient';
import PrescriptionModel, { IPrescriptionModel } from '../../models/prescriptions/Prescription';
import Appointment, { IAppointmentModel } from '../../models/appointments/Appointment';
import Doctor from '../../models/doctors/Doctor';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';

export default async function getRegisteredPatientDetails(req: AuthorizedRequest, res: Response) {
  try {
    const doctorId  = req.user?.id; 
    const { patientId } = req.params; // Extract patientId from request parameters

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Doctor not found' });
    }

    const patient: IPatientModel | null = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Patient not found' });
    }
    const appointment : IAppointmentModel | null = await Appointment.findOne({ patientId, status: 'completed' })
     if(!appointment){
      return res.status(StatusCodes.FORBIDDEN).json({message:'not authorized to view this patient info'})
     }

    const prescriptions: IPrescriptionModel[] = await PrescriptionModel.find({
      patientId: patient._id,
    });

    return res.status(StatusCodes.OK).json({
      patientInfo: patient,
      prescriptions: prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
}

