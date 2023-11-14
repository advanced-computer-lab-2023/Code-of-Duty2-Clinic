import { Response } from 'express';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { StatusCodes } from 'http-status-codes';
import Appointment from '../../models/appointments/Appointment';
import Patient from '../../models/patients/Patient';
import { findDoctorByEmail } from '../../services/doctors';
import { findPatientByEmail, findPatientById, findRegisteredFamilyMembersByID } from '../../services/patients';
import { IRegisteredFamilyMember } from '../../models/patients/interfaces/IRegisteredFamilyMember';
import { IDependentFamilyMember } from '../../models/patients/interfaces/IDependentFamilyMember';


export const selectAppointment = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { startTime, endTime, doctorEmail, familyMemberType, familyMemberID, dependentMemberNatID } = req.body;

    const patientId = req.user?.id!;

    const patient = await Patient.findById(patientId).select('+registeredFamilyMembers +dependentFamilyMembers');
    
    // const familyMember = await findRegisteredFamilyMembersByID(familyMemberID);
    // const familyMember = await findPatientById(familyMemberID);
    // const familyMember = await patient?.registeredFamilyMembers?.findOne({_id: familyMemberID});
    // await Patient.findById(familyMemberID).select('+registeredFamilyMembers');
    // const familyMember = await Patient.findOne({email: familyMemberEmail}).select('+registeredFamilyMembers');

    // const familyMemberDependent = await Patient.findOne({nationalId: dependentMemberNatID}).select('+dependentFamilyMembers');

    const doctor = await findDoctorByEmail(doctorEmail);
    
    if (!patient || !doctor) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Patient or doctor not found' });
    }

    if(doctor?.availableSlots){
      for (const slot of doctor.availableSlots) {
        if (slot.startTime > startTime || slot.endTime < endTime) {
          return res.status(StatusCodes.BAD_REQUEST).json({ message: 'This time slot is not available' });
        }
      }

    }else{
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Doctor does not have any available slot' });
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
      // const registeredFamilyMembers: IRegisteredFamilyMember[] = patient.registeredFamilyMembers || [];
      // const registeredFamilyMember = patient.registeredFamilyMembers?.find(
      //   (member) => member.id === patient?.id
      // );
      const RegisteredFamilyMember = await Patient.findById(familyMemberID);

      if (!RegisteredFamilyMember) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Family member not found or not registered' });
      }

      appointmentData = {
        timePeriod: { startTime, endTime },
        status: 'upcoming',
        doctorId: doctor._id, 
        patientId: RegisteredFamilyMember?.id,
      };

    }  else if (familyMemberType === 'Dependent') {
      // const dependentFamilyMembers: IDependentFamilyMember[] = patient.dependentFamilyMembers || [];
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
