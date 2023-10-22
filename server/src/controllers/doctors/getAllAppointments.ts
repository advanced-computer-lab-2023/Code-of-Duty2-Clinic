import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Doctor from "../../models/doctors/Doctor";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import Appointment from "../../models/appointments/Appointment";
import mongoose from "mongoose";

export const getAppointmentsWithAllPatients = async (req: Request, res: Response) => {
    const { doctorId } = req.params;
    if(!doctorId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'doctorId is required'});

    const allowedQueryParameters = ['status', 'appointmentTime', 'isTimeSet', 'patientName'];

    if(Object.keys(req.query).length > allowedQueryParameters.length || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
        res.status(StatusCodes.BAD_REQUEST).json("only patient name, appointment status or time slot must be provided");
        return;
    }

    if(req.query.appointmentTime && !req.query.isTimeSet || req.query.isTimeSet && !req.query.appointmentTime) {
        res.status(StatusCodes.BAD_REQUEST).json("isTimeSet and appointmentTime must be provided together");
        return;
    }
    
    const doctor = await Doctor.findById(doctorId);
    if(!doctor) return res.status(StatusCodes.NOT_FOUND).json({message: entityIdDoesNotExistError('Doctor', doctorId)});

    try {
        
        const searchQuery = getMatchingAppointmentsFields(req.query); 

        const appointments = await Appointment.aggregate([
            { $match: { doctorId: new mongoose.Types.ObjectId(doctorId) } },
            {
                $lookup: {
                    from: 'patients',
                    localField: 'patientId',
                    foreignField: '_id',
                    as: 'patient',
                }
            },
            { $match: { ...searchQuery } },
            { $unwind: '$patient' },
            { 
                $project: { 
                    appointmentId: '$_id',
                    _id: 0,
                    status: 1,
                    timePeriod: 1,
                    patient: {
                        id: '$patient._id' ,
                        name: '$patient.name',
                    },
                } 
            }
        ]);

        
        res.status(StatusCodes.OK).json(appointments);
    } catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }    
}


function getMatchingAppointmentsFields(urlQuery: any) {

    const { appointmentTime, isTimeSet, status, patientName } = urlQuery;

    let searchQuery: {
        status?: string;
        'patient.name'?: { $regex: string; $options: string};
        'timePeriod.startTime'?: any;
        'timePeriod.endTime'?: any;
    } = {};
    
    if (status && status !== '') {
        searchQuery.status = status;
    }
    if(patientName && patientName != '') {
        searchQuery['patient.name'] = { $regex: `^${patientName}`, $options: 'i' };
    }
  
    if (appointmentTime && appointmentTime !== '') {
        const requestedStartDate = new Date(appointmentTime);
        const requestedEndDate = new Date(appointmentTime);

        if(isTimeSet === true) {
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


