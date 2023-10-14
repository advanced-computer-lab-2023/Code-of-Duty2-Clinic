import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import Doctor from "../../models/doctors/Doctor";
import Appointment from "../../models/appointments/Appointment";
import { IAppointmentDetails } from "./interfaces/AppointmentDetails";

export const getAppointmentDetails = async (req: Request, res: Response) => {
    const { doctorId, appointmentId } = req.params;
    if(!doctorId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'doctorId is required'});
    if(!appointmentId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'appointmentId is required'});

    try {
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) return res.status(StatusCodes.NOT_FOUND).json({message: entityIdDoesNotExistError('Doctor', doctorId)});

        const appointment: any = await Appointment.findById(appointmentId)?.populate({
            path: 'patientId',
            select: {_id: 1, patientId: 1, timePeriod: 1, status: 1, name: 1, mobileNumber: 1, email: 1, gender: 1},
        });

        if(!appointment) return res.status(StatusCodes.NOT_FOUND).json({message: entityIdDoesNotExistError('Appointment', appointmentId)}); 

        const result: IAppointmentDetails = {
            appointmentId: appointment._id,
            patient: {
                id: appointment.patientId._id,
                name: appointment.patientId.name,
                mobileNumber: appointment.patientId.mobileNumber,
                email: appointment.patientId.email,
                gender: appointment.patientId.gender,
                age: appointment.patientId.age,
            },
            timePeriod: appointment.timePeriod,
            status: appointment.status,
        };
        res.status(StatusCodes.OK).json(result);
    } catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}