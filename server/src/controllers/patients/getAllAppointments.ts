import { Request, Response } from "express";
import Appointment from "../../models/appointments/Appointment";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import Patient from "../../models/patients/Patient";
import { DoctorAppointment } from "./interfaces/DoctorAppointment";
import Doctor from "../../models/doctors/Doctor";

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
        const appointmentsToFind = getMatchingAppointmentsFields(req.query);

        console.log(JSON.stringify(appointmentsToFind));
        const appointments = (await Appointment.find({patientId, ...appointmentsToFind})
        .populate({
            path: 'doctorId',
            select: {_id: 1, doctorId: 1, timePeriod: 1, status: 1, name: 1, speciality: 1},
        }))
        .filter((appointment: any) => appointment.doctorId.name
            .toLowerCase()
            .startsWith((req.query.doctorName as string).toLowerCase()))
        .map((appointment: any) => {
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
        // const result: any = await Promise.all(appointments.map(async (appointment: any) => {
        //     const doctor: any = await Doctor.find({
        //         _id: appointment.doctorId,
        //         name: new RegExp('^' + req.query.doctorName, 'i'),
        //     }).select({ _id: 1, name: 1});
        //     return {
        //         appointmentId: appointment._id,
        //         doctor: {
        //             id: doctor._id,
        //             name: doctor.name,
        //         },
        //         timePeriod: appointment.timePeriod,
        //         status: appointment.status
        //     }
        // }));

       

        res.status(StatusCodes.OK).json(appointments);
    } catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }    
}

function getMatchingAppointmentsFields(urlQuery: any) {

    const { appointmentTime, status, doctorName } = urlQuery;

    const appointmentsToFind: any = {};

    if (appointmentTime && appointmentTime !== '') {
        const requestedStartDate = new Date(appointmentTime).setSeconds(59, 999);
        const requestedEndDate = new Date(appointmentTime).setSeconds(0, 0);
        appointmentsToFind['$or'] = [
            { $and: [{'timePeriod.startTime':  { $lte: requestedStartDate }}, {'timePeriod.endTime': { $gte: requestedEndDate }}] }
        ];
    }

    let searchQuery: any = {};

  
    if (status && status !== '') {
        searchQuery.status = status;
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


