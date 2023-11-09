import { Response } from 'express';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { StatusCodes } from 'http-status-codes';
import Appointment from '../../models/appointments/Appointment';
import { findDoctorByEmail } from '../../services/doctors';
import { findPatientByEmail, findPatientById } from '../../services/patients';

export const selectAppointment = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { startTime, endTime, doctorEmail, familyMemberType, familyMemberEmail, dependentMemberNatID } = req.body;

    const patientId = req.user?.id!;

    const familyMember = await findPatientByEmail(familyMemberEmail);

    const patient = await findPatientById(patientId);
    const doctor = await findDoctorByEmail(doctorEmail);

    if (!patient || !doctor) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Patient or doctor not found' });
    }

    let appointmentData;

    if (familyMemberType === 'None') {

      appointmentData = {
        timePeriod: { startTime, endTime },
        status: 'upcoming',
        doctorId: doctor._id, 
        patientId: patientId,
      };

    } else if (familyMemberType === 'Registered') {
      const registeredFamilyMember = patient.registeredFamilyMembers?.find(
        (member) => member.id === familyMember?.id
      );

      if (!registeredFamilyMember) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Family member not found or not registered' });
      }

      appointmentData = {
        timePeriod: { startTime, endTime },
        status: 'upcoming',
        doctorId: doctor._id, 
        patientId: familyMember?.id,
      };

    } else if (familyMemberType === 'Dependent') {
      const dependentFamilyMember = patient.dependentFamilyMembers?.find(
        (member) => member.nationalId === dependentMemberNatID
      );

      if (!dependentFamilyMember) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Dependent family member not found' });
      }

      appointmentData = {
        timePeriod: { startTime, endTime },
        status: 'upcoming',
        doctorId: doctor._id, 
        patientId: patientId,
      };
      
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid family member type' });
    }

    const appointment = new Appointment(appointmentData);

    if (!appointment) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to create the appointment' });
    }

    await appointment.save();
    
    return res.status(StatusCodes.OK).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while creating the appointment' });
  }
};
