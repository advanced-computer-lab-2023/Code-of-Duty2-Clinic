import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Doctor from "../../models/doctors/Doctor";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { IAppointment } from "./interfaces/Appointment";
import Appointment from "../../models/appointments/Appointment";

export const getAppointmentsWithAllPatients = async (req: Request, res: Response) => {
    const { doctorId } = req.params;
    if(!doctorId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'doctorId is required'});

    const allowedQueryParameters = ['status', 'appointmentTime', 'patientName'];

    if(Object.keys(req.query).length > allowedQueryParameters.length || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
        res.status(StatusCodes.BAD_REQUEST).json("only patient name, appointment status or time slot must be provided");
        return;
    }
    
    const doctor = await Doctor.findById(doctorId);
    if(!doctor) return res.status(StatusCodes.NOT_FOUND).json({message: entityIdDoesNotExistError('Doctor', doctorId)});

    try {
        
        const appointmentsToFind = getMetchingAppointmentsFields(req.query); 

        const appointments: IAppointment[] = (await Appointment.find({doctorId, ...appointmentsToFind})
        .populate({
                path: 'patientId',
                select: {_id: 1, patientId: 1, timePeriod: 1, status: 1, name: 1},
        })).map((appointment: any) => ({
            appointmentId: appointment._id,
            patient: {
                id: appointment.patientId._id,
                name: appointment.patientId.name, 
            },
            timePeriod: appointment.timePeriod, 
            status: appointment.status
        }));;
        
        res.status(StatusCodes.OK).json(appointments);
    } catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }    
}


function getMetchingAppointmentsFields(urlQuery: any) {

    const { appointmentTime, status, patientName } = urlQuery;

    let searchQuery: any = {};

    if(patientName && patientName !== '') {
        searchQuery.patientName = patientName;
    }
    if (status && status !== '') {
        searchQuery.status = status;
    }
    const appointmentsToFind: any = {};

    if (appointmentTime && appointmentTime !== '') {
        const requestedStartDate = new Date(appointmentTime).setSeconds(59, 999);
        const requestedEndDate = new Date(appointmentTime).setSeconds(0, 0);
        appointmentsToFind['$or'] = [
            { $and: [{'timePeriod.startTime':  { $lte: requestedStartDate }}, {'timePeriod.endTime': { $gte: requestedEndDate }}] }
        ];
    }

    const queries = Object.keys(searchQuery).map(key => 
        ({ [key]: searchQuery[key] })
    );

    if(queries.length > 0) {
        if(appointmentsToFind['$or']) {
            appointmentsToFind['$or'].push({$or: queries});
        }
        else {
            appointmentsToFind['$or'] = queries;
        }
    }

    return appointmentsToFind;
}


