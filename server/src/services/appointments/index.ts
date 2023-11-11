import mongoose from "mongoose";
import Appointment from "../../models/appointments/Appointment";
import { getRequestedTimePeriod } from "../../utils/getRequestedTimePeriod";

export const findAppointmentById = async (id: string) => await Appointment.findById(id);

export const getAppointments = async (isPatient: boolean, userId: string, urlQuery: any) => {
    const searchQuery = getMatchingAppointmentsFields(urlQuery);
    const user = isPatient ? 'patientId' : 'doctorId';
    return await Appointment.aggregate([
        { $match: { [user]: new mongoose.Types.ObjectId(userId) }},
        {
            $lookup: {
                from: isPatient ? 'doctors' : 'patients',
                localField: isPatient ? 'doctorId' : 'patientId',
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

export const findMostRecentCompletedAppointment = async (doctorId: string, patientId: string) => {
    return Appointment.findOne({
      doctorId,
      patientId,
      status: 'completed',
    }).sort({ 'timePeriod.endTime': -1 }); // Sorting Bl3ks to retreive the top most recent appointment
  }
  


