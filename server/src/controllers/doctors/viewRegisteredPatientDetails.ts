import { Request, Response } from 'express';
import PatientModel, { IPatientModel } from '../../models/patients/Patient';
import PrescriptionModel, { IPrescriptionModel } from '../../models/prescriptions/Prescription';
import Appointment, { IAppointmentModel } from '../../models/appointments/Appointment';
import Doctor from '../../models/doctors/Doctor';
import { StatusCodes } from 'http-status-codes';

export default async function viewRegisteredPatientDetails(req: Request, res: Response) {
  try {
    const { doctorId, patientId } = req.params; // Extract patientId from request parameters

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
      res.status(StatusCodes.NOT_FOUND).json({message:'not authorized to view this patient info'})
     }

    // Find prescriptions associated with this patient
    const prescriptions: IPrescriptionModel[] = await PrescriptionModel.find({
      patientId: patient._id,
    });

    // You can extract and return specific health records or patient information here
    return res.status(200).json({
      patientInfo: patient,
      prescriptions: prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

