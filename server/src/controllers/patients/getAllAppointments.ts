import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { findPatientById } from "../../services/patients";
import { getPatientAppointments } from "../../services/appointments/patients";

export const getAppointmentsWithAllDoctors = async (req: AuthorizedRequest, res: Response) => {
    const patientId  = req.user?.id;
    if(!patientId) return res.status(StatusCodes.BAD_REQUEST).json({message: 'patientId is required'});

    const allowedQueryParameters = ['status', 'appointmentTime', 'isTimeSet', 'targetName'];

    if(Object.keys(req.query).length > allowedQueryParameters.length || Object.keys(req.query).some(key => !allowedQueryParameters.includes(key))) {
        return res.status(StatusCodes.BAD_REQUEST).json("only doctorName, appointment status or time slot must be provided");
    }

    if(req.query.appointmentTime && !req.query.isTimeSet || req.query.isTimeSet && !req.query.appointmentTime) {
        return res.status(StatusCodes.BAD_REQUEST).json("isTimeSet and appointmentTime must be provided together");
    }

    try {
        const patient = await findPatientById(patientId);
        if(!patient) return res.status(StatusCodes.NOT_FOUND).json({message: entityIdDoesNotExistError('Patient', patientId)});

        const appointments = await getPatientAppointments(patientId, req.query);
        res.status(StatusCodes.OK).json(appointments);    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    
}


