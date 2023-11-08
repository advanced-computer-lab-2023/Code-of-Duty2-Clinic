// import { Response } from 'express';
// import { AuthorizedRequest } from '../../types/AuthorizedRequest';
// import { StatusCodes } from 'http-status-codes';
// import  Appointment  from '../../models/appointments/Appointment';
// import { findDoctorById } from '../../services/doctors';
// import { findPatientById } from '../../services/patients';

// export const createAppointmentController = async (req: AuthorizedRequest, res: Response) => {
//   try {
//     const { startTime, endTime, familyMemberType, familyMemberId } = req.body;

//     const patientId = req.user?.id!;
//     const doctorId = req.params.doctorId;

//     const patient = await findPatientById(patientId);
//     const doctor = await findDoctorById(doctorId);

//     if (!patient || !doctor) {
//       return res.status(StatusCodes.NOT_FOUND).json({ message: 'Patient or doctor not found' });
//     }

//     if (familyMemberType === 'registered') {
//       const registeredFamilyMember = patient.registeredFamilyMembers?.find(
//         (member) => member.id === familyMemberId
//       );

//       if (!registeredFamilyMember) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Family member not found or not registered' });
//       }

//       const appointment = new Appointment({
//         timePeriod: { startTime, endTime },
//         status: 'upcoming',
//         doctorId: doctor._id, 
//         patientId: patientId,
//       });

//       if (!appointment) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to create the appointment' });
//       }
//     } else if (familyMemberType === 'dependent') {
//       const dependentFamilyMember = patient.dependentFamilyMembers?.find(
//         (member) => member.id === familyMemberId
//       );

//       if (!dependentFamilyMember) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Dependent family member not found' });
//       }

//       // const newAppointment = new Appointment(appointment);
//       // await newAppointment.save();

//     } else {
//       return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid family member type' });
//     }
    
//     return res.status(StatusCodes.OK).json({ message: 'Appointment created successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while creating the appointment' });
//   }
// };
