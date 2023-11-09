import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import Appointment from '../../models/appointments/Appointment';
import { findDoctorById } from '../../services/doctors';
import { findPatientByEmail } from '../../services/patients';
import { findAppointmentDetailsForDoctor } from '../../services/appointments/doctors';


export const scheduleFollowUp = async (req: AuthorizedRequest, res: Response) => {
    try {
      const { patientEmail, followUpDays } = req.body;
      const { initialAppointmentId } = req.params;
  
      const doctorId = req.user?.id!;
      const doctor = await findDoctorById(doctorId);
      const patient = await findPatientByEmail(patientEmail);
    //   const initialAppointment = await Appointment.findById(initialAppointmentId);
      const initialAppointment = await findAppointmentDetailsForDoctor(doctorId, initialAppointmentId);
  
      if (!doctor || !patient || !initialAppointment) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Doctor, patient, or initial appointment not found' });
      }
  
      
      if (initialAppointment.status !== 'completed') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Cannot schedule a follow-up for an ongoing or upcoming appointment' });
      }
  
      
      const followUpStartTime = addDays(initialAppointment.timePeriod.endTime, followUpDays);
      const followUpEndTime = addDays(followUpStartTime, 1);
  
      const followUpAppointmentData = {
        timePeriod: { startTime: followUpStartTime, endTime: followUpEndTime },
        status: 'upcoming',
        doctorId: doctor._id,
        patientId: patient._id,
      };
  
      const followUpAppointment = new Appointment(followUpAppointmentData);
      await followUpAppointment.save();
  
      return res.status(StatusCodes.CREATED).json({ message: 'Follow-up appointment scheduled successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while scheduling the follow-up appointment' });
    }
  };


export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };