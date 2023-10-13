import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import Doctor from "../../models/doctors/Doctor";
import Appointment from "../../models/appointments/Appointment";
import Patient from "../../models/patients/Patient";

export const getRegisteredPatients = async(req: Request, res: Response) => {
    const { doctorId } = req.params;
    if (!doctorId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'doctorId is required' });
    }
  
    const allowedQueryParams = ['name'];
    if (Object.keys(req.query).some((queryParam) => !allowedQueryParams.includes(queryParam))) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid query parameter' });
    }
  
    try {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: entityIdDoesNotExistError('Doctor', doctorId) });
      }
  
      const appointments: any = await Appointment.find({
        doctorId,
        status: 'completed',
      }).populate({
        path: 'patientId',
        select: {patientId: 1, name: 1, gender: 1, _id: 1},
      });
      
      const patients = appointments
      .filter((appointment: any) => {
        const name: any = req.query.name;
        return appointment.patientId.name.toLowerCase().startsWith(name?.toLowerCase() || '');
        })
      .map((appointment: any) => ({
            patientId: appointment.patientId._id,
            name: appointment.patientId.name,
            gender: appointment.patientId.gender, 
      }));
      res.status(StatusCodes.OK).json(patients);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};