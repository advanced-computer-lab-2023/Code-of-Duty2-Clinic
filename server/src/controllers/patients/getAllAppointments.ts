import { Request, Response } from "express";
import Appointment from "../../models/appointments/Appointment";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import Patient from "../../models/patients/Patient";
import mongoose from "mongoose";

export const getAppointmentsWithAllDoctors = async (req: Request, res: Response) => {
    const { patientId } = req.params;
    if(!patientId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'patientId is required'});

    const allowedQueryParameters = ['status', 'appointmentTime', 'isTimeSet', 'doctorName'];

    if(Object.keys(req.query).length > allowedQueryParameters.length || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
        return res.status(StatusCodes.BAD_REQUEST).json("only doctorName, appointment status or time slot must be provided");
    }

    if(req.query.appointmentTime && !req.query.isTimeSet || req.query.isTimeSet && !req.query.appointmentTime) {
        return res.status(StatusCodes.BAD_REQUEST).json("isTimeSet and appointmentTime must be provided together");
    }

    const patient = await Patient.findById(patientId);
    if(!patient) return res.status(StatusCodes.NOT_FOUND).json({message: entityIdDoesNotExistError('Patient', patientId)});

    const searchQuery = getMatchingAppointmentsFields(req.query);
    try {
        const appointments = await Appointment.aggregate([
            { $match: { patientId: new mongoose.Types.ObjectId(patientId) } },
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'doctorId',
                    foreignField: '_id',
                    as: 'doctor'
                }
            },
            { $match: { ...searchQuery } },
            { $unwind: '$doctor' },
            {
                $project: {
                    appointmentId: '$_id',
                    _id: 0,
                    status: 1,
                    timePeriod: 1,
                    doctor: {
                        id: '$doctor._id',
                        name: '$doctor.name',
                        imageUrl: '$doctor.imageUrl',
                        speciality: '$doctor.speciality',
                    }
                }
            }
        ]);

        res.status(StatusCodes.OK).json(appointments);
    } catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }    
}

function getMatchingAppointmentsFields(urlQuery: any) {
    const { appointmentTime, status, doctorName } = urlQuery;
    const isTimeSet = urlQuery.isTimeSet === 'true';

    let searchQuery: {
        status?: string;
        'doctor.name'?: { $regex: string; $options: string};
        'timePeriod.startTime'?: any;
        'timePeriod.endTime'?: any;
    } = {};
    
    if (status && status !== '') {
        searchQuery.status = status;
    }
    if(doctorName && doctorName != '') {
        searchQuery['doctor.name'] = { $regex: `^${doctorName}`, $options: 'i' };
    }
    if (appointmentTime && appointmentTime !== '') {
        const requestedStartDate = new Date(appointmentTime);
        const requestedEndDate = new Date(appointmentTime);

        if(isTimeSet) {
            requestedStartDate.setSeconds(59, 999)
            requestedEndDate.setSeconds(0, 0);
        }
        else {
            requestedStartDate.setHours(23, 59, 59, 999);
            requestedEndDate.setHours(0, 0, 0, 0);  
        }
        searchQuery['timePeriod.startTime'] = { $lte: requestedStartDate };
        searchQuery['timePeriod.endTime'] = { $gte: requestedEndDate };
    }
    return searchQuery;
}


