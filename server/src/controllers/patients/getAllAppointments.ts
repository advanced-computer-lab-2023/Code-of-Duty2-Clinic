import { Request, Response } from "express";
import Appointment from "../../models/appointments/Appointment";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import Patient from "../../models/patients/Patient";
import { DoctorAppointment } from "./interfaces/DoctorAppointment";

export const getAppointmentsWithAllDoctors = async (req: Request, res: Response) => {
    const { patientId } = req.params;
    if(!patientId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'patientId is required'});

    const allowedQueryParameters = ['status', 'appointmentTime', 'doctorName'];

    if(Object.keys(req.query).length > allowedQueryParameters.length || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
        res.status(StatusCodes.BAD_REQUEST).json("only doctorName, appointment status or time slot must be provided");
        return;
    }

    const patient = await Patient.findById(patientId);
    if(!patient) return res.status(StatusCodes.NOT_FOUND).json({message: entityIdDoesNotExistError('Patient', patientId)});

    try {
        const appointmentsToFind = getMetchingAppointmentsFields(req.query);
       
        const appointments: DoctorAppointment[] = (await Appointment.find({patientId, ...appointmentsToFind})
        .populate({
            path: 'doctorId',
            select: {_id: 1, doctorId: 1, timePeriod: 1, status: 1, name: 1, speciality: 1},
        })).map((appointment: any) => {
            return {
                appointmentId: appointment._id,
                doctor: {
                    id: appointment.doctorId._id,
                    name: appointment.doctorId.name,
                    speciality: appointment.doctorId.speciality,
                },
                timePeriod: appointment.timePeriod, 
                status: appointment.status
            }
        });

        res.status(StatusCodes.OK).json(appointments);
    } catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }    
}

function getMetchingAppointmentsFields(urlQuery: any) {

    const { appointmentTime, status, doctorName } = urlQuery;

    let searchQuery: any = {};

    if(doctorName && doctorName !== '') {
        searchQuery.doctorName = doctorName;
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


