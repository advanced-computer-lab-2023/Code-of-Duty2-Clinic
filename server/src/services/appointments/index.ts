import mongoose from "mongoose";
import Appointment from "../../models/appointments/Appointment";
import { getRequestedTimePeriod } from "../../utils/getRequestedTimePeriod";

export const findAppointmentById = async (id: string) => await Appointment.findById(id);

export const getAppointments = async (isPatient: boolean, userId: string, urlQuery: any) => {
    const searchQuery = getMatchingAppointmentsFields(urlQuery);

    return await Appointment.aggregate([
        { $match: { doctorId: new mongoose.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: isPatient ? 'patients' : 'doctors',
                localField: isPatient ? 'patientId' : 'doctorId',
                foreignField: '_id',
                as: 'user',
            }
        },
        { $match: { ...searchQuery } },
        { $unwind: '$user' },
        {
            $project: {
                appointmentId: '$_id',
                _id: 0,
                status: 1,
                timePeriod: 1,
                user: {
                    id: '$user._id',
                    name: '$user.name',
                    imageUrl: '$user.imageUrl',
                },
            }
        }
    ]);
};


function getMatchingAppointmentsFields(urlQuery: any) {

    const { appointmentTime, status, name } = urlQuery;
    const isTimeSet = urlQuery.isTimeSet === 'true';

    let searchQuery: {
        status?: string;
        'user.name'?: { $regex: string; $options: string; };
        'timePeriod.startTime'?: any;
        'timePeriod.endTime'?: any;
    } = {};

    if (status && status !== '') {
        searchQuery.status = status;
    }
    if (name && name != '') {
        searchQuery['user.name'] = { $regex: `^${name}`, $options: 'i' };
    }

    if (appointmentTime && appointmentTime !== '') {
        const { requestedStartTime, requestedEndTime } = getRequestedTimePeriod(appointmentTime, isTimeSet);
        searchQuery['timePeriod.startTime'] = { $lte: requestedStartTime };
        searchQuery['timePeriod.endTime'] = { $gte: requestedEndTime };
    }
    return searchQuery;
}


