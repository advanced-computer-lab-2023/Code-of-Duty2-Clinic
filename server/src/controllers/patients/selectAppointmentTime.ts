import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Appointment from '../../models/appointments/Appointment';
import Patient from '../../models/patients/Patient';

export const selectAppointment = async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId;
    const appointmentId = req.params.appointmentId;
  
    // Identify the patient
    const { patientId, username } = req.body;
  
    try {
      let patient;
  
      // Check if a username is provided
      if (username) {
        // The patient is selecting an appointment for a family member
        // Find the patient by username
        patient = await Patient.findOne({ username });
      } else {
        // The patient is selecting an appointment for themselves
        // Use the provided patientId
        patient = await Patient.findById(patientId);
      }
  
      if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Patient not found' });
      }
  
      // Find and update the appointment
      const appointment = await Appointment.findOneAndUpdate(
        { _id: appointmentId, patientId: patient._id },
        { status: 'selected' },
        { new: true }
      );
  
      if (!appointment) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Appointment not found or could not be selected' });
      }
  
      res.status(StatusCodes.OK).json({ message: 'Appointment selected successfully' });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while selecting the appointment' });
    }
  };