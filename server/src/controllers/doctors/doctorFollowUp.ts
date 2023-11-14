import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import Appointment from "../../models/appointments/Appointment";
import { findDoctorById } from "../../services/doctors";
import { findPatientByEmail, findPatientById } from "../../services/patients";
import { findMostRecentCompletedAppointment } from "../../services/appointments";

export const scheduleFollowUp = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { startTime, endTime } = req.body;
    const doctorId = req.user?.id!;

    const { patientId } = req.params;
    const doctor = await findDoctorById(doctorId);
    const patient = await findPatientById(patientId);

    if (!doctor || !patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Doctor or patient not found" });
    }

    const initialAppointment = await findMostRecentCompletedAppointment(
      doctorId,
      patientId
    );

    const findPatientAppointments = await Appointment.find({
      patientId: patientId,
      status: "upcoming",
    });

    for (const appointment of findPatientAppointments) {
      console.log(appointment.timePeriod.startTime, startTime);
      console.log(appointment.timePeriod.endTime, endTime);
      if (
        appointment.timePeriod.startTime <= startTime ||
        appointment.timePeriod.endTime >= endTime
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Patient is already booked for this time period",
        });
      }
    }
    if (!initialAppointment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "No recent completed appointment found between the doctor and patient",
      });
    }

    if (initialAppointment.status !== "completed") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Cannot schedule a follow-up for an ongoing or upcoming appointment",
      });
    }

    const followUpAppointmentData = {
      timePeriod: { startTime: startTime, endTime: endTime },
      status: "upcoming",
      doctorId: doctor._id,
      patientId: patient._id,
    };

    const followUpAppointment = new Appointment(followUpAppointmentData);
    await followUpAppointment.save();

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Follow-up appointment scheduled successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "An error occurred while scheduling the follow-up appointment",
    });
  }
};
